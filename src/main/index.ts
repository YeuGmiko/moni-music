import setupApp from './app'
import setupIpc from './ipc'

// 关闭安全警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = String(true)
// 关闭弃用警告
process.noDeprecation = true

setupIpc()
setupApp()
