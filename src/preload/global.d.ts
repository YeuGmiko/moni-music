import type { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    interface Window {
        electron: ElectronAPI
    }
    namespace App {
        declare interface Store {
            state: {
                // Layout首页路由名称
                routeHomeName: string
                theme: App.Theme
                windowState: App.WindowState
            }
            data: {
                // 所有的歌曲信息
                totalSongs: App.BaseInfo.Song[]
                // 音乐库路径列表，用于刷新音乐文件路径列表
                musicLibrary: string[]
                // 音乐文件路径列表，用于刷新歌曲列表
                musicPaths: string[]
                // 歌单列表
                playlists: App.BaseInfo.Playlist[]
            }
        }
        // 主题
        declare type Theme = 'light' | 'dark' | 'system'
        declare interface WindowState {
            isMaximized: boolean
            windowWidth: number
            windowHeight: number
        }
        namespace BaseInfo {
            export interface Song {
                path: string // 歌曲所在绝对路径
                title: string // 标题
                artist: string // 作者
                album: string // 专辑信息
                playlist: string[] // 所在歌单（ID）
                duration: number // 总时长
                sampleRate: number
                fileSize: string // 文件大小
                isLoved: boolean // 是否喜欢
                isDelete: boolean // 是否软删除
            }
            export interface Playlist {
                id: string // 歌单ID
                title: string // 标题
                description: string // 描述
                coverDataUrl: string // 歌单封面
                createTime: number // 创建时间
            }
        }
    }
}
