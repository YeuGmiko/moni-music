<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('MyAlbum Page Mounted')
})
</script>

<template>
  <div class="my-album">
    <h1 class="title">我的专辑</h1>
  </div>
</template>

<style scoped>
.my-album {
  .title {
    margin: 0;
  }
}
</style>
