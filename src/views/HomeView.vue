<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InputComponent from '@/components/InputComponent.vue'
import ListComponent from '@/components/ListComponent.vue'

const inputComponent = ref<InstanceType<typeof InputComponent>>()

onMounted(() => {
  inputComponent.value?.testMethod()
})
</script>

<template>
  <v-container>
    <InputComponent ref="inputComponent" />
    <ListComponent />
  </v-container>
</template>
