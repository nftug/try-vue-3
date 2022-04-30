<script setup lang="ts">
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useContentsStore } from '@/store/contents'

// Props & Emits
const props = withDefaults(defineProps<{ max?: number }>(), { max: 10 })

// store
const store = useContentsStore()

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
      return v || '同意してください'
    },
  },
})
const isValid = useIsFormValid()
const { value: contentValue, errorMessage: contentError } = useField('content')
const { value: isAgreeValue, errorMessage: isAgreeError } = useField('isAgree')

const handleClickButton = handleSubmit(({ content }) => {
  const newItem = { id: undefined, content }
  store.addItem(newItem)
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
