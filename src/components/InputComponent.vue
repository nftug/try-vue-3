<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { Item } from '@/interfaces/index'
import { v4 as uuid } from 'uuid'

const props = defineProps<{ max: number }>()
interface Emits {
  (e: 'add', item: Item): void
}
const emit = defineEmits<Emits>()

const contentValue = ref('')
const contentRules: ((v: string) => string | true)[] = [
  (v) => !!v || '内容を入力してください',
  (v) => v.length <= props.max || `${props.max}文字以内で入力してください`,
]
const isValid = ref(true)
const form = ref()
const validate = ({ target }: Event) => {
  if (target instanceof HTMLInputElement) {
    // contentValue.value = target.value
    nextTick(() => {
      if (!target.value || contentValue.value) {
        form.value.validate()
      }
    })
  }
}

const handleClickButton = async () => {
  if (isValid.value) {
    const newItem = { id: uuid(), value: contentValue.value }
    emit('add', newItem)
    contentValue.value = ''
  }
}

const testMethod = () => {
  console.log('testMethod')
}

defineExpose({ testMethod })
</script>

<template>
  <v-form
    ref="form"
    v-model="isValid"
    @input="validate"
    @submit.prevent="handleClickButton"
  >
    <v-text-field
      v-model="contentValue"
      :rules="contentRules"
      label="内容"
      hide-details="auto"
      required
    />
    <div class="mt-2">
      <v-btn :disabled="!isValid" type="submit">追加</v-btn>
    </div>
  </v-form>
</template>
