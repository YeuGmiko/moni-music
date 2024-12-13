<script setup lang="ts">
import { onMounted } from 'vue'
import { useSongStore } from '@/store/song'

const songStore = useSongStore()

const { setup: setupSong } = songStore

onMounted(async () => {
    // Setup
    await setupSong()
})
</script>

<template>
    <NMessageProvider>
        <RouterView></RouterView>
    </NMessageProvider>
</template>
