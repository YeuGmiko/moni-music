<script setup lang="ts">
import { onMounted } from 'vue'
import { useSongStore } from '@/store/song'
import { storeToRefs } from 'pinia'
import SongList from '@/components/song-list/index.vue'

const songStore = useSongStore()
const { songs } = storeToRefs(songStore)

onMounted(async () => {
  console.log('MyMusic Page Mounted')
})
</script>

<template>
  <div class="my-music">
    <h1 class="title">我的歌曲</h1>
    <SongList :songs="songs" play-list-name="total" />
  </div>
</template>

<style scoped lang="scss">
.my-music {
  padding: 10px 0;
  user-select: none;

  .title {
    margin: 0;
  }
}
</style>
