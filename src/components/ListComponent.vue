<script setup lang="ts">
import { useContentsStore } from '@/store/contents'
import type { Id } from '@/interfaces'

const store = useContentsStore()

const handleClickDelete = (id: Id) => {
  store.deleteItem(id)
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
      <tr v-for="item in store.items" :key="item.id">
        <td>{{ item.content }}</td>
        <td>
          <v-btn
            icon="mdi-delete"
            size="small"
            @click="handleClickDelete(item.id)"
          ></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
