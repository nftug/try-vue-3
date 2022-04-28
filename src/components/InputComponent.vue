<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Item } from '@/interfaces/index'
import { v4 as uuid } from 'uuid'

interface Emits {
  (e: 'add', item: Item): void
}
const emit = defineEmits<Emits>()

const inputValue = ref('')
const hasError = computed(() => inputValue.value.length > 10)

const handleClickButton = () => {
  if (inputValue.value) {
    const newItem = { id: uuid(), value: inputValue.value }
    emit('add', newItem)
    inputValue.value = ''
  }
}

const testMethod = () => {
  console.log('testMethod')
}

defineExpose({ testMethod })
</script>

<template>
  <v-text-field
    v-model="inputValue"
    type="text"
    label="項目名"
    hide-details="auto"
  />

  <div class="mt-2">
    <v-btn :disabled="hasError" @click="handleClickButton">追加</v-btn>
  </div>

  <p v-if="hasError" class="mt-2 text-red text-body-2">
    10文字以内で入力してください。
  </p>
</template>
