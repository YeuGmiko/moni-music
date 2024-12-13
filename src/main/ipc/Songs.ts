import { ipcMain } from 'electron'
import { AppStoreChannel, ElectronStoreKey, SongChannel } from '@common/constants'
import { getSongCoverDataUrl, getSongDataUrl, updateMusic, updateSongInfo } from '../utils/songs'
import { get } from '../store'

export default () => {
    console.log('setup song ipc')
    // 获取歌曲列表
    ipcMain.handle(SongChannel.FETCH_TOTAL_MUSIC, () => {
        return get(ElectronStoreKey.DATA.TOTAL_SONGS)
    })

    // 刷新所有歌曲路径
    ipcMain.handle(AppStoreChannel.UPDATE_MUSIC_PATHS, async () => {
        try {
            await updateMusic()
            return true
        } catch {
            return false
        }
    })

    // 根据path获取歌曲封面图片(base64)
    ipcMain.handle(SongChannel.FETCH_SONG_COVER, async (_, path: string) => {
        try {
            return await getSongCoverDataUrl(path)
        } catch {
            return ''
        }
    })

    // 根据path获取歌曲文件内容
    ipcMain.handle(SongChannel.FETCH_MUSIC_DATA_URL, (_, path: string) => {
        return getSongDataUrl(path)
    })

    ipcMain.handle(SongChannel.UPDATE_MUSIC_INFO, (_, song: App.BaseInfo.Song) => {
        return updateSongInfo(song)
    })
}
