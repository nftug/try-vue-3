<script setup lang="ts">
import { ref } from 'vue'
import { useContentsStore } from '@/store/contents'
import type { Id, Item } from '@/typings'
import Dialog from '@/components/Dialog.vue'

const store = useContentsStore()
const itemDeleteDialog = ref<InstanceType<typeof Dialog>>()
const currentItem = ref<Item>()

const handleClickDelete = async (id: Id) => {
  currentItem.value = store.getItem(id)
  if (await itemDeleteDialog.value?.showDialog()) {
    store.deleteItem(id)
  }
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

  <Dialog
    ref="itemDeleteDialog"
    hash="delete-item"
    title="削除の確認"
    label-ok="はい"
    label-cancel="いいえ"
    :width="400"
  >
    <p>次のアイテムを削除しますか？</p>
    <ul class="mt-3 ml-3">
      <li>ID: {{ currentItem?.id }}</li>
      <li>内容: {{ currentItem?.content }}</li>
    </ul>
  </Dialog>
</template>
