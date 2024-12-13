import SongList from '@/components/song-list/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    SongList: typeof SongList
  }
}
