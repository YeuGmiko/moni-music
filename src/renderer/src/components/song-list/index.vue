<script setup lang="ts">
import { useAudioStore } from '@/store/audio'
import { storeToRefs } from 'pinia'
import { useSongStore } from '@/store/song'
import { toRefs, watch } from 'vue'

interface Props {
    songs: App.BaseInfo.Song[]
    playListName: string
}

const props = defineProps<Props>()
const { songs, playListName } = toRefs(props)

const audioStore = useAudioStore()
const { playState } = storeToRefs(audioStore)
const { play, paused, setPlaylist } = audioStore
const { changeLove } = useSongStore()

watch(songs, (newVal) => {
    playState.value.playListName === playListName.value && setPlaylist(newVal)
})

function playItem(index: number) {
    play(props.playListName, props.songs, index)
}

function toggleLove(song: App.BaseInfo.Song): void {
    changeLove(song, !song.isLoved)
}

function toCommonTime(time: number): string {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
}
</script>

<template>
    <table class="data-table">
        <colgroup>
            <col style="width: 5%" />
            <col class="col-song" />
            <col />
            <col style="width: 5%" />
            <col style="width: 10%" />
            <col style="width: 15%" />
        </colgroup>
        <tr class="table-header">
            <th>#</th>
            <th>歌曲</th>
            <th>专辑</th>
            <th>喜欢</th>
            <th>时长</th>
            <th>大小</th>
        </tr>
        <tr v-for="(song, index) in songs" :key="song.title" class="song">
            <td>{{ index > 8 ? index + 1 : `0${index + 1}` }}</td>
            <td class="song-info">
                <div class="container">
                    <div class="info" @dblclick="playItem(index)">
                        <div class="detail">
                            <p class="title">
                                {{ song.title }}
                                <span
                                    v-show="
                                        playState.playListName === playListName &&
                                        playState.currentIndex === index
                                    "
                                    class="song-playing"
                                >
                                    <i class="iconfont icon-song-playing"></i>
                                </span>
                            </p>
                            <p class="author">{{ song.artist }}</p>
                        </div>
                    </div>
                    <NSpace class="operator">
                        <span
                            v-if="
                                playState.state === 'playing' && playState.song?.path === song.path
                            "
                            @click="paused"
                        >
                            <i class="iconfont icon-song-play"></i>
                        </span>
                        <span v-else @click="playItem(index)">
                            <i class="iconfont icon-song-pause"></i>
                        </span>
                        <span><i class="iconfont icon-song-more"></i></span>
                    </NSpace>
                </div>
            </td>
            <td>{{ song.album }}</td>
            <td class="loved">
                <span v-if="song.isLoved" @click="toggleLove(song)">
                    <i class="iconfont icon-love-fill"></i>
                </span>
                <span v-else @click="toggleLove(song)">
                    <i class="iconfont icon-love-outline"></i>
                </span>
            </td>
            <td>{{ toCommonTime(song.duration) }}</td>
            <td>{{ song.fileSize }}</td>
        </tr>
    </table>
</template>

<style scoped lang="scss">
.data-table {
    position: relative;
    margin-top: 10px;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    text-wrap: nowrap;
    user-select: none;

    td {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    tr.table-header th {
        background-color: rgba(255, 255, 255, 0.5); /* 半透明背景 */
        backdrop-filter: blur(10px); /* 模糊效果 */
    }

    th {
        position: sticky;
        top: 0;
        text-align: left;
    }

    tr:hover td {
        background-color: rgba(0, 0, 0, 0.2);
    }
}

.song td {
    padding-right: 10px;
}

.song-info .container {
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    box-sizing: border-box;

    .info {
        display: flex;
        gap: 10px;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    &:hover .operator {
        display: flex !important;
    }

    .operator {
        display: none !important;
        min-width: 30%;

        .iconfont {
            font-size: 1.2rem;
            cursor: pointer;
        }
    }

    .detail {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: self-start;
        text-align: left;
        overflow: hidden;

        .title {
            font-weight: bold;

            .song-playing {
                color: #00cc66;
            }
        }
        .author {
            color: rgba(0, 0, 0, 0.6);
        }

        p {
            display: block;
            width: 100%;
            margin: 0;
            line-height: 1em;
            text-wrap: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    img {
        height: 100%;
    }
}

.loved {
    color: red;

    .iconfont {
        cursor: pointer;
        font-size: 1.2rem;
    }
}
</style>
