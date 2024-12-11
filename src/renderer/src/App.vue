<script setup lang="ts">
import { onMounted } from 'vue'
import { useStateStore } from '@/store/state'
import { useSongStore } from '@/store/song'

const stateStore = useStateStore()
const songStore = useSongStore()

const { setup: setupStore } = stateStore
const { setup: setupSong } = songStore

onMounted(async () => {
  // Setup
  await setupStore()
  await setupSong()
})
</script>

<template>
  <NMessageProvider>
    <RouterView></RouterView>
  </NMessageProvider>
</template>
