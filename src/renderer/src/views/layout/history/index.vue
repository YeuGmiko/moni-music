<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
    console.log('MyHistory Page Mounted')
})
</script>

<template>
    <div class="my-history">
        <h1 class="title">播放历史</h1>
    </div>
</template>

<style scoped>
.my-history {
    .title {
        margin: 0;
    }
}
</style>
