import { ipcMain } from 'electron'
import { IpcChannel } from '@common/constants'
import { fetchAppState } from '../store'

export default () => {
  console.log('setup route ipc')
  ipcMain.handle(IpcChannel.REDIRECT_TO_LAYOUT_HOME, () => {
    return fetchAppState().HomeRouteName
  })
}
