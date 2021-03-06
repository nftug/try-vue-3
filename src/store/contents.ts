import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import type { Item, Id } from '@/typings'

export const useContentsStore = defineStore('contents', {
  state: () => ({
    items: [] as Item[],
  }),
  actions: {
    getItem(id: Id) {
      return this.items.find((v) => v.id === id)
    },
    addItem(item: Item) {
      this.items.push({ ...item, id: item.id || uuid() })
    },
    deleteItem(id: Id) {
      if (typeof id === 'string') {
        const index = this.items.findIndex((v) => v.id === id)
        if (index !== -1) this.items.splice(index, 1)
      }
    },
    editItem(item: Item) {
      const index = this.items.findIndex((v) => v.id === item.id)
      if (index !== -1) this.items.splice(index, 1, { ...item })
    },
  },
})
