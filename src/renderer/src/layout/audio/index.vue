<script setup lang="ts">
import SongCoverUrl from '@/assets/static/images/song-cover.jpg'
import Drawer from '@/layout/audio/drawer.vue'
import { onMounted, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useAudioStore } from '@/store/audio'
import { storeToRefs } from 'pinia'

const message = useMessage()
const playListShow = ref<boolean>(false)
const audioStore = useAudioStore()
const { playPrev, playNext, paused, keepPlay, updateSongProgress, init } = audioStore
const { playState } = storeToRefs(audioStore)
const audio = ref<HTMLAudioElement | null>()

function audioPlay() {
  if (!playState.value.song) {
    message.info('请先选择音乐')
    return
  }
  keepPlay()
}

function fillZeroToStr(num: number): string {
  return `${num > 9 ? '' : '0'}${Math.floor(num)}`
}

function formatTime(seconds: number): string {
  if (seconds < 0) seconds = 0
  return `${fillZeroToStr(Math.floor(seconds / 60))}:${fillZeroToStr(seconds % 60)}`
}

function showPlayList() {
  playListShow.value = true
}

onMounted(() => {
  init(audio.value as HTMLAudioElement)
})
</script>

<template>
  <div class="audio">
    <audio ref="audio" class="no-display-audio" :src="playState.song?.dataUrl" autoplay></audio>
    <div class="container">
      <div class="song-info">
        <img :src="playState.song?.coverUrl ?? SongCoverUrl" alt="歌曲封面" class="cover" />
        <div class="info">
          <div class="name">{{ playState.song?.title ?? '暂未选择歌曲喵' }}</div>
          <div class="artist">{{ playState.song?.artist }}</div>
        </div>
      </div>
      <div class="audio-center">
        <div class="controller">
          <span class="like">
            <i v-show="playState.song?.isLoved" class="iconfont icon-love-fill" />
            <i v-show="!playState.song?.isLoved" class="iconfont icon-love-outline" />
          </span>
          <span class="prev" @click="playPrev"><i class="iconfont icon-audio-prev"></i></span>
          <span v-show="playState.state === 'playing'" class="play playing" @click="paused">
            <i class="iconfont icon-audio-paused" />
          </span>
          <span v-show="playState.state === 'paused'" class="play paused" @click="audioPlay">
            <i class="iconfont icon-play" />
          </span>
          <span class="next" @click="playNext"><i class="iconfont icon-audio-next"></i></span>
          <span class="play-state">
            <i class="iconfont icon-audio-list-circle"></i>
          </span>
        </div>
        <div class="progress">
          {{ formatTime(playState.song?.currentTime ?? 0) }}
          <NSlider
            :min="0"
            :max="playState.song?.duration ?? 0"
            :format-tooltip="formatTime"
            :value="playState.song?.currentTime ?? 0"
            @update:value="updateSongProgress"
          ></NSlider>
          {{ formatTime(playState.song?.duration ?? 0) }}
        </div>
      </div>
      <div class="audio-menu">
        <span><i class="iconfont icon-audio-voice-level-1"></i></span>
        <span @click="showPlayList"><i class="iconfont icon-play-list"></i></span>
      </div>
    </div>
    <NDrawer
      v-model:show="playListShow"
      mask-closable
      close-on-esc
      class="window-no-drag"
      width="400"
    >
      <Drawer />
    </NDrawer>
  </div>
</template>

<style scoped lang="scss">
.audio {
  padding: 10px 30px;
  height: 78px;
  box-sizing: border-box;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
  user-select: none;

  .container {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
  }
}
.no-display-audio {
  width: 200px;
  height: 20px;
  background-color: pink;
}

.song-info {
  position: absolute;
  display: flex;
  gap: 10px;
  height: 100%;

  .play-list {
    flex: 1;
  }

  img {
    height: 100%;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 200px;
    text-wrap: nowrap;

    .name {
      font-size: 1.1rem;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;

      .iconfont {
        color: red;
      }
    }
    .artist {
      font-size: 0.8rem;
      color: rgba(0, 0, 0, 0.4);
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.audio-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .controller {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    span {
      line-height: 2rem;
    }

    .iconfont {
      font-size: 1.5rem;
      cursor: pointer;
    }

    .play .iconfont {
      font-size: 2rem;
      color: #09cf7b;
    }

    .prev .iconfont,
    .next .iconfont {
      font-size: 2rem;
    }

    .like {
      color: red;
    }
  }
  .progress {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 350px;
  }
}

.audio-menu {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  .iconfont {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>
