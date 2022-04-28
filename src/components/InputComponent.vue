<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { Item } from '@/interfaces/index'
import { v4 as uuid } from 'uuid'
import { useField } from 'vee-validate'

const props = defineProps<{ max: number }>()
interface Emits {
  (e: 'add', item: Item): void
}
const emit = defineEmits<Emits>()

const inputValue = useField('content', (v: string) => {
  if (!v) return '内容を入力してください'
  if (v && v.length <= props.max)
    return `${props.max}文字以内で入力してください`
  return true
})
const isValid = ref(true)
const form = ref()

const handleClickButton = async () => {
  const newItem = { id: uuid(), value: inputValue.value as unknown as string }
  emit('add', newItem)
  console.log(inputValue.value)
  inputValue.value = '' as unknown as Ref<unknown>
}

const testMethod = () => {
  console.log('testMethod')
}

defineExpose({ testMethod })
</script>

<template>
  <v-form ref="form" v-model="isValid" lazy-validation>
    <v-text-field
      v-model="inputValue.value"
      :error-message="[inputValue.errorMessage]"
      label="項目名"
      hide-details="auto"
      required
    />
    <div class="mt-2">
      <v-btn :disabled="!isValid" @click="handleClickButton">追加</v-btn>
    </div>
  </v-form>
</template>
