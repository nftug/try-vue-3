<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TinyEmitter } from 'tiny-emitter'
import { useDisplay } from 'vuetify'

// Props & Emits
interface Props {
  title?: string | null
  message?: string | null
  width?: number | string
  labelOk?: string
  labelCancel?: string
  formValid?: boolean
  noTemplate?: boolean
  hash?: string | null
}
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  message: undefined,
  width: 350,
  labelOk: 'OK',
  labelCancel: 'キャンセル',
  formValid: true,
  noTemplate: false,
  hash: undefined,
})

const emit = defineEmits<{
  (e: 'show'): void
  (e: 'mount'): void
}>()

// Variables
const dialog = ref(false)
const display = useDisplay()
const [route, router] = [useRoute(), useRouter()]
const { proxy } = getCurrentInstance()!
const emitter = new TinyEmitter()

// Watch
watch(
  () => route.hash,
  (newHash, oldHash) => {
    // ブラウザの戻るボタンを押した時、ダイアログを閉じる
    const isDiffHash = props.hash && oldHash === `#${props.hash}`
    if (isDiffHash && proxy?.$isBrowserBack) {
      emitter.emit('answer', null)
    }
  }
)

watch(dialog, async (newVal) => {
  const hasRouteHash = route.hash == `#${props.hash}`
  if (props.hash) {
    if (newVal && !hasRouteHash) {
      await router.push({ ...route, hash: `#${props.hash}` })
    } else if (!newVal && hasRouteHash) {
      await router.go(-1)
    }
  }

  if (newVal) emit('show')
})

// onMounted
onMounted(() => {
  emit('mount')
})

// Methods
const showDialog = (): Promise<boolean | null> => {
  dialog.value = true
  return new Promise((resolve) => {
    emitter.once('answer', (value: boolean) => {
      dialog.value = false
      resolve(value)
    })
  })
}

const handleAnswer = (value: boolean | null) => {
  emitter.emit('answer', value)
}

defineExpose({ showDialog, handleAnswer })
</script>

<template>
  <v-dialog v-model="dialog" v-bind="$attrs">
    <template #activator="{ isActive }">
      <slot name="activator" :is-active="isActive"></slot>
    </template>

    <v-card tile :width="props.width" :max-width="display.width.value - 20">
      <!-- フルスクリーンダイアログ -->
      <template v-if="noTemplate">
        <slot
          name="default"
          :title="title"
          :ok="handleAnswer.bind(null, true)"
          :cancel="handleAnswer.bind(null, false)"
        ></slot>
      </template>

      <!-- 通常のダイアログ -->
      <template v-else>
        <slot name="title" :title="title">
          <v-card-title class="mt-2 text-h5" primary-title>
            {{ title }}
          </v-card-title>
        </slot>

        <v-card-text class="text-body-2">
          <slot
            name="default"
            :message="message"
            :ok="handleAnswer.bind(null, true)"
            :cancel="handleAnswer.bind(null, false)"
          >
            <p>{{ message }}</p>
          </slot>
        </v-card-text>

        <v-card-actions>
          <slot
            name="actions"
            :ok="handleAnswer.bind(null, true)"
            :cancel="handleAnswer.bind(null, false)"
          >
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="handleAnswer(false)">
              {{ labelCancel }}
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              :disabled="!formValid"
              @click="handleAnswer(true)"
            >
              {{ labelOk }}
            </v-btn>
          </slot>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>
