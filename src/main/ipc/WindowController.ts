import { BrowserWindow, ipcMain } from 'electron'
import { WindowIpcChannel } from '@common/constants'

export default () => {
    console.log('setup window-controller ipc')
    ipcMain.handle(WindowIpcChannel.MINIMIZE, (event) => {
        const window = BrowserWindow.fromId(event.sender.id)
        if (!window?.isMinimizable()) return false
        window?.minimize()
        return true
    })

    ipcMain.handle(WindowIpcChannel.MAXIMIZE, (event) => {
        const window = BrowserWindow.fromId(event.sender.id)
        if (!window?.isMaximizable()) return false
        window?.maximize()
        return true
    })

    ipcMain.handle(WindowIpcChannel.CLOSE, (event) => {
        const window = BrowserWindow.fromId(event.sender.id)
        if (!window?.isClosable()) return false
        window.close()
        return true
    })

    ipcMain.handle(WindowIpcChannel.WINDOWING, (event) => {
        const window = BrowserWindow.fromId(event.sender.id)
        if (!window?.isMaximized()) return false
        window?.unmaximize()
        return true
    })
}
