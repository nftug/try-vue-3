<script setup lang="ts">
import type { Item } from '@/interfaces/index'
import { v4 as uuid } from 'uuid'
import { useField, useForm, useIsFormValid } from 'vee-validate'

const props = defineProps<{ max: number }>()
interface Emits {
  (e: 'add', item: Item): void
}
const emit = defineEmits<Emits>()

const validationSchema = {
  content(v: string) {
    if (!v) return '内容を入力してください'
    if (!!v && v.length > props.max)
      return `${props.max}文字以内で入力してください`
    return true
  },
}
const initialValues = { content: '' }
const { handleSubmit, resetForm } = useForm({
  validationSchema,
  initialValues,
})
const { value: contentValue, errorMessage: contentError } = useField('content')
const isValid = useIsFormValid()
const handleClickButton = handleSubmit((v) => {
  const newItem = { id: uuid(), value: v.content }
  emit('add', newItem)
  resetForm()
})

const testMethod = () => {
  console.log('testMethod')
}

defineExpose({ testMethod })
</script>

<template>
  <v-form v-model="isValid" @submit.prevent="handleClickButton">
    <v-text-field
      v-model="contentValue"
      :error-messages="contentError"
      label="内容"
      hide-details="auto"
    />
    <div class="mt-2">
      <v-btn class="ma-2" color="primary" :disabled="!isValid" type="submit">
        追加
      </v-btn>
      <v-btn class="ma-2" @click="resetForm()">リセット</v-btn>
    </div>
  </v-form>
</template>
