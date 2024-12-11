import type { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
  }
  namespace App {
    export interface State {
      // Layout首页路由名称
      HomeRouteName: string
      // 主题
      Theme: 'light' | 'dark' | 'system'
    }
    export interface Data {
      // 所有的歌曲信息
      Songs: App.BaseInfo.Song[]
      // 音乐库路径列表，用于刷新音乐文件路径列表
      MusicLibrary: string[]
      // 音乐文件路径列表，用于刷新歌曲列表
      MusicPaths: string[]
    }
    namespace BaseInfo {
      export interface Song {
        path: string
        title: string
        artist: string
        album: string
        duration: number
        sampleRate: number
        fileSize: string
        isLoved: boolean
        isDelete: boolean
      }
    }
  }
}
