<script setup lang="ts">
import type { Item } from '@/interfaces/index'
import { v4 as uuid } from 'uuid'
import { useField, useForm, useIsFormValid } from 'vee-validate'

// Props & Emits
const props = defineProps<{ max: number }>()
const emit = defineEmits<{
  (e: 'add', item: Item): void
}>()

// フォーム関連
const { handleSubmit, resetForm } = useForm({
  initialValues: { content: '', isAgree: false },
  validationSchema: {
    content(v: string) {
      if (!v) return '内容を入力してください'
      if (!!v && v.length > props.max)
        return `${props.max}文字以内で入力してください`
      return true
    },
    isAgree(v: boolean) {
      if (!v) return '同意してください'
      return true
    },
  },
})
const { value: contentValue, errorMessage: contentError } = useField('content')
const { value: isAgreeValue, errorMessage: isAgreeError } = useField('isAgree')
const isValid = useIsFormValid()

const handleClickButton = handleSubmit((fields) => {
  const newItem = { id: uuid(), value: fields.content }
  emit('add', newItem)
  resetForm()
})

// その他
const testMethod = () => {
  console.log('testMethod')
}

defineExpose({ testMethod })
</script>

<template>
  <form @submit.prevent="handleClickButton">
    <v-text-field
      v-model="contentValue"
      autocomplete="off"
      :error-messages="contentError"
      label="内容"
      hide-details="auto"
    />
    <v-checkbox
      v-model="isAgreeValue"
      :error-messages="isAgreeError"
      label="同意する"
      hide-details="auto"
    ></v-checkbox>
    <v-btn class="ma-2" color="primary" :disabled="!isValid" type="submit">
      追加
    </v-btn>
    <v-btn class="ma-2" @click="resetForm()">リセット</v-btn>
  </form>
</template>
