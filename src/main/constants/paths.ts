import { app } from 'electron'
import { resolve } from 'path'

export const APP_PATH = app.getPath('userData')
export const APP_DATA_PATH = resolve(APP_PATH, 'AppData')

export const APP_SETTING_FILE_NAME = 'app.json'
export const APP_SONGS_INFO_FILE_NAME = 'songs.json'
export const APP_MUSIC_LIBRARY_FILE_NAME = 'music-library.json'
export const APP_MUSIC_PATHS_FILE_NAME = 'music-paths.json'

export const APP_SETTING_FILE_PATH = resolve(APP_DATA_PATH, APP_SETTING_FILE_NAME)
export const APP_SONGS_FILE_PATH = resolve(APP_DATA_PATH, APP_SONGS_INFO_FILE_NAME)
export const APP_MUSIC_LIBRARY_FILE_PATH = resolve(APP_DATA_PATH, APP_MUSIC_LIBRARY_FILE_NAME)
export const APP_MUSIC_PATHS_FILE_PATH = resolve(APP_DATA_PATH, APP_MUSIC_PATHS_FILE_NAME)
