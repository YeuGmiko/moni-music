<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSongStore } from '@/store/song'
import { storeToRefs } from 'pinia'

const playListName = 'loved-list'

const songStore = useSongStore()
const { songs } = storeToRefs(songStore)

const lovedSongs = computed<App.BaseInfo.Song[]>(() => songs.value.filter((item) => item.isLoved))
onMounted(() => {
    console.log('MyLove Page Mounted')
})
</script>

<template>
    <div class="my-love">
        <h1 class="title">我喜欢</h1>
        <!--    <NTabs class="tabs">-->
        <!--      <NTabPane v-for="tab in tabs" :key="tab.name" :name="tab.name" :tab="tab.label">-->
        <!--        <component :is="tab.component"></component>-->
        <!--      </NTabPane>-->
        <!--    </NTabs>-->
        <SongList :songs="lovedSongs" :play-list-name="playListName"></SongList>
    </div>
</template>

<style scoped lang="scss">
.my-love {
    .title {
        margin: 0;
    }
    .tabs {
        margin-top: 10px;
    }
}
</style>
