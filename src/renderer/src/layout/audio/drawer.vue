<script setup lang="ts">
import { useAudioStore } from '@/store/audio'
import { storeToRefs } from 'pinia'

const audioStore = useAudioStore()
const { play, paused } = audioStore
const { playList, playState } = storeToRefs(audioStore)
</script>

<template>
  <div class="drawer">
    <h1 class="title">播放列表</h1>
    <NScrollbar>
      <NList class="play-list" clickable hoverable>
        <NListItem v-for="(song, index) in playList.data" :key="song.path">
          <div class="song" @dblclick="play(index)">
            <div class="info">
              <div class="name">{{ song.title }}</div>
              <div class="artist">{{ song.artist }}</div>
            </div>
            <div class="op">
              <span
                v-if="playState.state === 'playing' && playState.song?.path === song.path"
                @click="paused"
              >
                <i class="iconfont icon-song-play"></i>
              </span>
              <span v-else @click="play(index)"><i class="iconfont icon-song-pause"></i></span>
            </div>
          </div>
        </NListItem>
      </NList>
    </NScrollbar>
  </div>
</template>

<style scoped lang="scss">
.drawer {
  padding: 20px !important;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  user-select: none;

  :deep(.n-list-item) {
    padding: 2px 0;
  }
  .title {
    margin: 0;
  }
  .song {
    display: flex;
    justify-content: space-between;
  }
  .info {
    flex: 1;
    text-wrap: nowrap;
    overflow: hidden;
    max-width: 260px;

    & > div {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .name {
      font-weight: bold;
      font-size: 1.1rem;
    }
    .artist {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  .op {
    padding-right: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100px;
    box-sizing: border-box;

    .iconfont {
      font-size: 1.5rem;
    }
  }
}
</style>
