import { ipcMain } from 'electron'
import { AppStoreChannel, ElectronStoreKey } from '@common/constants'
import { get } from '../store'

export default () => {
    console.log('setup state ipc')
    ipcMain.handle(AppStoreChannel.FETCH_MUSIC_LIBRARY, () => {
        return get(ElectronStoreKey.DATA.MUSIC_LIBRARY)
    })
    ipcMain.handle(AppStoreChannel.FETCH_MUSIC_PATHS, () => {
        return get(ElectronStoreKey.DATA.MUSIC_PATHS)
    })
}
