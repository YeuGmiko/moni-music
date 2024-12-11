import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SongChannel } from '@common/constants'

const ipcRenderer = window.electron.ipcRenderer

export const useSongStore = defineStore('song', () => {
  const songs = ref<App.BaseInfo.Song[]>([])

  async function setup() {
    songs.value = await ipcRenderer.invoke(SongChannel.FETCH_APP_DATA_SONGS)
  }

  async function update(): Promise<boolean> {
    try {
      await ipcRenderer.invoke(SongChannel.UPDATE_MUSIC)
      await setup()
      return true
    } catch {
      return false
    }
  }

  return {
    songs,
    setup,
    update
  }
})
