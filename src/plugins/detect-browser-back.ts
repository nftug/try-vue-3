import type { App } from 'vue'

export default {
  install: (app: App) => {
    app.config.globalProperties.$isBrowserBack = false
    history.replaceState(null, '', null)

    addEventListener('popstate', () => {
      app.config.globalProperties.$isBrowserBack = true
      setTimeout(() => {
        app.config.globalProperties.$isBrowserBack = false
      }, 500)
    })
  },
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $isBrowserBack: boolean
  }
}
