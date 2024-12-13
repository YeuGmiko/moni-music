import fs from 'fs'
import sharp from 'sharp'
import { nativeImage } from 'electron'
import path from 'node:path'
import { formatFileSize } from './formatStr'
import { resolve } from 'path'
import { get, update } from '../store'
import { ElectronStoreKey } from '@common/constants'

const defaultSongInfo: Omit<
    App.BaseInfo.Song,
    'id' | 'path' | 'duration' | 'sampleRate' | 'fileSize' | 'isLoved'
> = {
    title: '未知歌曲名[ERROR]',
    artist: '未知艺术家[ERROR]',
    album: '未知专辑[ERROR]',
    isDelete: false,
    playlist: []
}

function isFile(path: string): boolean {
    if (!fs.existsSync(path)) return false
    return fs.statSync(path).isFile()
}

// 批量获取多个路径下的所有文件路径
function getFilePaths(paths: string[]) {
    const filePaths: string[] = []
    for (const path of paths) {
        // 判断路径是否合法
        if (!fs.existsSync(path)) throw new Error(`path ${path} not found`)
        // 添加文件路径
        if (isFile(path)) filePaths.push(path)
        // 递归文件夹
        else filePaths.push(...getFilePaths(fs.readdirSync(path).map((p) => resolve(path, p))))
    }
    return filePaths
}

export async function getSongCoverDataUrl(path: string) {
    if (!fs.existsSync(path)) throw new Error(`path does not exist: ${path}`)
    if (!isFile(path)) throw new Error(`path does not a music file: ${path}`)
    const { parseFile } = await import('music-metadata')
    const metadata = await parseFile(path)
    const imageBuffer = await sharp(metadata.common.picture?.shift()?.data)
        .resize(200, 200)
        .toBuffer()
    return nativeImage.createFromBuffer(imageBuffer).toDataURL()
}

export function getSongDataUrl(path: string) {
    if (!fs.existsSync(path)) throw new Error(`path does not exist: ${path}`)
    if (!isFile(path)) throw new Error(`path does not a music file: ${path}`)
    return fs.readFileSync(path)
}

// 更改某个音乐的信息
export function updateSongInfo(song: App.BaseInfo.Song) {
    const Songs = get(ElectronStoreKey.DATA.TOTAL_SONGS) as App.BaseInfo.Song[]
    const res = Songs.some((item) => {
        if (item.path !== song.path) return false
        Object.assign(item, song)
        return true
    })
    res && update(ElectronStoreKey.DATA.TOTAL_SONGS, Songs)
    return res
}

// 根据文件路径列表批量获取数据
export async function getSongInfo(filePaths: string[]): Promise<Map<string, App.BaseInfo.Song>> {
    const { parseFile } = await import('music-metadata')
    const songs: Map<string, App.BaseInfo.Song> = new Map()
    for (const file of filePaths) {
        if (!isFile(file)) throw new Error(`path does not a music file: ${path}`)
        try {
            const fileState = fs.statSync(file)
            const metadata = await parseFile(file)
            const { title, artist, album } = metadata.common
            const { duration, sampleRate } = metadata.format
            const info: App.BaseInfo.Song = {
                path: file,
                title: title ?? defaultSongInfo.title,
                artist: artist ?? defaultSongInfo.artist,
                album: album ?? defaultSongInfo.album,
                playlist: defaultSongInfo.playlist,
                duration: duration ?? -1,
                sampleRate: sampleRate ?? -1,
                fileSize: formatFileSize(fileState.size),
                isLoved: false,
                isDelete: false
            }
            songs.set(file, info)
        } catch {
            /*Empty*/
        }
    }
    return songs
}

export async function updateMusic() {
    const MusicLibrary = get(ElectronStoreKey.DATA.MUSIC_LIBRARY)
    const MusicPaths = get(ElectronStoreKey.DATA.MUSIC_PATHS)
    const Songs = get(ElectronStoreKey.DATA.TOTAL_SONGS)
    // 删除已经不存在了的文件路径
    for (let index = 0, len = MusicPaths.length; index < len; index++)
        if (!fs.existsSync(MusicPaths[index])) delete MusicPaths[index]
    // 添加更新后的新路径至musicPaths
    MusicPaths.push(...getFilePaths(MusicLibrary).filter((path) => !MusicPaths.includes(path)))
    const songMap: Map<string, App.BaseInfo.Song> = new Map()
    Songs.forEach((song) => {
        songMap.set(song.path, song)
    })
    // 去除已经被软删除的歌曲
    const newInfoMap = await getSongInfo(MusicPaths.filter((path) => !songMap.get(path)?.isDelete))
    for (const path of newInfoMap.keys()) {
        const songInfo = songMap.get(path)
        // 更新已存在的音乐
        if (songInfo) Object.assign(songInfo, newInfoMap.get(path))
        // 新添加的音乐
        else songMap.set(path, newInfoMap.get(path) as App.BaseInfo.Song)
    }
    update(ElectronStoreKey.DATA.TOTAL_SONGS, Array.from(songMap.values()))
    update(ElectronStoreKey.DATA.MUSIC_PATHS, MusicPaths)
}
