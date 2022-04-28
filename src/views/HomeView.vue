<script setup lang="ts">
import type { Item } from '@/interfaces'
import { onMounted, ref } from 'vue'
import InputComponent from '@/components/InputComponent.vue'
import ListComponent from '@/components/ListComponent.vue'

const items = ref<Item[]>([])
const inputComponent = ref<InstanceType<typeof InputComponent>>()

const handleAddItem = (item: Item) => {
  items.value.push(item)
}

const handleDeleteItem = (id: string) => {
  const index = items.value.findIndex((v) => v.id === id)
  items.value.splice(index, 1)
}

onMounted(() => {
  inputComponent.value?.testMethod()
})
</script>

<template>
  <v-container>
    <InputComponent ref="inputComponent" @add="handleAddItem" />
    <ListComponent :items="items" @delete="handleDeleteItem" />
  </v-container>
</template>
