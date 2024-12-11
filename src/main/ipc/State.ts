import { ipcMain } from 'electron'
import { StateChannel } from '@common/constants'
import { fetchAppData, fetchAppState } from '../store'

export default () => {
  console.log('setup state ipc')
  ipcMain.handle(StateChannel.FETCH_APP_STATE, () => {
    return fetchAppState()
  })
  ipcMain.handle(StateChannel.FETCH_MUSIC_LIBRARY, () => {
    return fetchAppData().MusicLibrary
  })
  ipcMain.handle(StateChannel.FETCH_MUSIC_PATHS, () => {
    return fetchAppData().MusicPaths
  })
}
