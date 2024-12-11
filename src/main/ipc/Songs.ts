import { ipcMain } from 'electron'
import { SongChannel } from '@common/constants'
import { getSongCoverDataUrl, getSongDataUrl, updateMusic } from '../utils/songs'
import { fetchAppData } from '../store'

export default () => {
  console.log('setup song ipc')
  // 获取歌曲列表
  ipcMain.handle(SongChannel.FETCH_APP_DATA_SONGS, () => {
    return fetchAppData().Songs
  })

  // 根据path获取歌曲封面图片(base64)
  ipcMain.handle(SongChannel.FETCH_SONG_COVER, async (_, path: string) => {
    try {
      return await getSongCoverDataUrl(path)
    } catch (error) {
      return ''
    }
  })

  // 根据musicPaths和musicLibrary更新songs
  ipcMain.handle(SongChannel.UPDATE_MUSIC, async () => {
    try {
      await updateMusic()
      return true
    } catch {
      return false
    }
  })

  // 根据path获取歌曲文件内容
  ipcMain.handle(SongChannel.FETCH_MUSIC_DATA_URL, (_, path: string) => {
    return getSongDataUrl(path)
  })
}
