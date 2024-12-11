import { defineStore } from 'pinia'
import { StateChannel } from '@common/constants'
import { ref } from 'vue'

const ipcRenderer = window.electron.ipcRenderer

export const useStateStore = defineStore('app-state', () => {
  const appState = ref<App.State | undefined>()

  async function setup() {
    appState.value = await ipcRenderer.invoke(StateChannel.FETCH_APP_STATE)
  }

  return {
    appState,
    setup
  }
})
