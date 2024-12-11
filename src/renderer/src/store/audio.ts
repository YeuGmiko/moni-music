import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { SongChannel } from '@common/constants'

type PlayMode = 'loop' | 'order' | 'list-cycle'
type AudioState = 'playing' | 'paused'

type SongInfo = {
  coverUrl: string
  dataUrl: string
  currentTime: number
} & App.BaseInfo.Song

type PlayState = {
  state: AudioState
  currentTime: number
  muted: boolean
  volume: number
  rate: number
  playListName: string
  playMode: PlayMode
  song?: SongInfo
  currentIndex: number
}

const ipcRenderer = window.electron.ipcRenderer

export const useAudioStore = defineStore('audio', () => {
  const audio = ref<HTMLAudioElement | null>()
  const playState = reactive<PlayState>({
    state: 'paused',
    currentTime: -1,
    muted: false,
    volume: 1,
    rate: 1,
    playListName: '',
    playMode: 'list-cycle',
    currentIndex: -1
  })
  const playList = ref<App.BaseInfo.Song[]>([])
  let playStateTimer: NodeJS.Timeout | undefined

  function init(audioDom: HTMLAudioElement) {
    audio.value = audioDom
  }

  function goStateTimer() {
    playStateTimer = setInterval(() => {
      if (playState.song && playState.state === 'playing') {
        if (playState.song.currentTime < Math.floor(playState.song.duration ?? 0))
          playState.song.currentTime++
        else {
          setTimeout(async () => {
            switch (playState.playMode) {
              case 'loop':
                await play(playState.currentIndex)
                break
              case 'order':
                if (playState.currentIndex >= playList.value.length - 1) paused()
                else await playNext()
                break
              case 'list-cycle':
                await playNext()
                break
            }
          }, 1000)
          audio.value?.pause()
          clearInterval(playStateTimer)
        }
      }
    }, 1000)
  }

  function stopStateTimer() {
    clearInterval(playStateTimer)
  }

  function updateSongProgress(progress: number) {
    if (playState.song) playState.song.currentTime = progress
    if (audio.value) audio.value.currentTime = progress
  }

  async function play(index: number) {
    paused()
    const playedSong = playList.value[index]
    playState.currentIndex = index
    keepPlay()
    playState.song = {
      ...playedSong,
      coverUrl: await fetchSongCoverUrl(playedSong),
      dataUrl: await fetchDataUrl(playedSong),
      currentTime: 0
    }
    if (audio.value) audio.value.src = playState.song.dataUrl
  }

  async function playByList(playListName: string, songs: App.BaseInfo.Song[], index: number) {
    if (songs === null || songs.length === 0) throw new Error('当前没有可播放列表')
    playList.value = songs
    playState.playListName = playListName
    await play(index)
  }

  async function playPrev() {
    if (playList.value.length === 0) throw new Error('当前没有可播放列表')
    if (playState.currentIndex <= 0) playState.currentIndex = playList.value.length
    await play(playState.currentIndex - 1)
  }

  async function playNext() {
    if (playList.value.length === 0) throw new Error('当前没有可播放列表')
    if (playState.currentIndex >= playList.value.length - 1) playState.currentIndex = -1
    await play(playState.currentIndex + 1)
  }

  function paused() {
    playState.state = 'paused'
    stopStateTimer()
    audio.value?.pause()
  }

  function keepPlay() {
    playState.state = 'playing'
    goStateTimer()
    audio.value?.play()
  }

  async function fetchSongCoverUrl(song: App.BaseInfo.Song): Promise<string> {
    return await ipcRenderer.invoke(SongChannel.FETCH_SONG_COVER, song.path)
  }

  async function fetchDataUrl(song: App.BaseInfo.Song) {
    const data = await ipcRenderer.invoke(SongChannel.FETCH_MUSIC_DATA_URL, song.path)
    const blob = new Blob([data], { type: 'audio/flac' })
    return URL.createObjectURL(blob)
  }

  return {
    playState,
    playList,
    init,
    play: playByList,
    playPrev,
    playNext,
    paused,
    keepPlay,
    updateSongProgress
  }
})
