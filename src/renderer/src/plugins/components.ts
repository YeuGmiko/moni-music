import SongList from '@/components/song-list/index.vue'
import type { App } from 'vue'

export function setupComponents(app: App) {
  app.component('SongList', SongList)
}
