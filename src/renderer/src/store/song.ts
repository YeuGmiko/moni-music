import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AppStoreChannel, SongChannel } from '@common/constants'

const ipcRenderer = window.electron.ipcRenderer

export const useSongStore = defineStore('song', () => {
    const songs = ref<App.BaseInfo.Song[]>([])

    async function setup() {
        songs.value = await ipcRenderer.invoke(SongChannel.FETCH_TOTAL_MUSIC)
    }

    async function update(): Promise<boolean> {
        try {
            await ipcRenderer.invoke(AppStoreChannel.UPDATE_MUSIC_PATHS)
            await setup()
            return true
        } catch {
            return false
        }
    }

    async function changeLove(song: App.BaseInfo.Song, isLoved: boolean) {
        song.isLoved = isLoved
        await ipcRenderer.invoke(SongChannel.UPDATE_MUSIC_INFO, JSON.parse(JSON.stringify(song)))
        await setup()
    }

    return {
        songs,
        setup,
        update,
        changeLove
    }
})
