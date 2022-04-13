<script setup lang="ts">
import type { Item } from '@/interfaces'

interface Props {
  items: Item[]
}
const props = defineProps<Props>()

interface Emits {
  (e: 'delete', id: string): void
}
const emit = defineEmits<Emits>()

const handleClickDelete = (id: string) => {
  emit('delete', id)
}
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left" width="70%">値</th>
        <th class="text-left">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.items" :key="item.id">
        <td>{{ item.value }}</td>
        <td>
          <v-btn small @click="handleClickDelete(item.id)">
            <v-icon left>mdi-delete</v-icon>
            削除する
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
