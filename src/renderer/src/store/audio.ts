import { defineStore } from 'pinia'
import { ref } from 'vue'
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
    const playState = ref<PlayState>({
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
            if (playState.value.song && playState.value.state === 'playing') {
                if (playState.value.song.currentTime < Math.floor(playState.value.song.duration ?? 0))
                    playState.value.song.currentTime++
                else {
                    setTimeout(async () => {
                        switch (playState.value.playMode) {
                            case 'loop':
                                await play(playState.value.currentIndex)
                                break
                            case 'order':
                                if (playState.value.currentIndex >= playList.value.length - 1) paused()
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
        if (playState.value.song) playState.value.song.currentTime = progress
        if (audio.value) audio.value.currentTime = progress
    }

    async function play(index: number) {
        paused()
        const playedSong = playList.value[index]
        playState.value.currentIndex = index
        keepPlay()
        playState.value.song = {
            ...playedSong,
            coverUrl: await fetchSongCoverUrl(playedSong),
            dataUrl: await fetchDataUrl(playedSong),
            currentTime: 0
        }
        if (audio.value) audio.value.src = playState.value.song.dataUrl
    }

    function setPlaylist(songs: App.BaseInfo.Song[]) {
        playList.value = songs
    }

    async function playByList(playListName: string, songs: App.BaseInfo.Song[], index: number) {
        if (songs === null || songs.length === 0) throw new Error('当前没有可播放列表')
        playList.value = songs
        playState.value.playListName = playListName
        await play(index)
    }

    async function playPrev() {
        if (playList.value.length === 0) throw new Error('当前没有可播放列表')
        if (playState.value.currentIndex <= 0) playState.value.currentIndex = playList.value.length
        await play(playState.value.currentIndex - 1)
    }

    async function playNext() {
        if (playList.value.length === 0) throw new Error('当前没有可播放列表')
        if (playState.value.currentIndex >= playList.value.length - 1) playState.value.currentIndex = -1
        await play(playState.value.currentIndex + 1)
    }

    function paused() {
        playState.value.state = 'paused'
        stopStateTimer()
        audio.value?.pause()
    }

    function keepPlay() {
        playState.value.state = 'playing'
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
        playIndex: play,
        setPlaylist,
        playPrev,
        playNext,
        paused,
        keepPlay,
        updateSongProgress
    }
})
