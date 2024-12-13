import { ipcMain } from 'electron'
import { ElectronStoreKey, IpcChannel } from '@common/constants'
import { get } from '../store'

export default () => {
    console.log('setup route ipc')
    ipcMain.handle(IpcChannel.REDIRECT_TO_LAYOUT_HOME, () => {
        return get(ElectronStoreKey.STATE.ROUTE_HOME_NAME)
    })
}
