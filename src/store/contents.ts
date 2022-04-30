import { defineStore } from 'pinia'
import type { Item } from '@/interfaces'

export const useContentsStore = defineStore('contents', {
  state: () => ({
    items: [] as Item[],
  }),
  actions: {
    addItem(item: Item) {
      this.items.push(item)
    },
    deleteItem(id: string) {
      const index = this.items.findIndex((v) => v.id === id)
      this.items.splice(index, 1)
    },
  },
})
