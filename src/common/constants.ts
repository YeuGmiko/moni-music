export const WindowIpcChannel = {
    MINIMIZE: 'window-minimize',
    MAXIMIZE: 'window-maximize',
    WINDOWING: 'window-windowing',
    CLOSE: 'window-close'
}
export const IpcChannel = {
    REDIRECT_TO_LAYOUT_HOME: 'redirect-to-layout-home',
    FETCH_APP_STATE: 'fetch-app-state'
}
export const SongChannel = {
    FETCH_TOTAL_MUSIC: 'fetch-app-data-songs',
    FETCH_SONG_COVER: 'fetch-song-cover',
    FETCH_MUSIC_DATA_URL: 'request-music-data-url',
    UPDATE_MUSIC_INFO: 'update-music-info'
}
export const AppStoreChannel = {
    FETCH_MUSIC_LIBRARY: 'fetch-music-library',
    FETCH_MUSIC_PATHS: 'fetch-music-paths',
    UPDATE_MUSIC_PATHS: 'update-music-paths'
}

export const ElectronStoreKey = {
    STATE: {
        ROUTE_HOME_NAME: 'state.route-home-name',
        THEME: 'state.theme',
        WINDOW_STATE: {
            IS_MAXIMIZED: 'state.window-state.is-maximized',
            WINDOW_WIDTH: 'state.window-state.window-width',
            WINDOW_HEIGHT: 'state.window-state.window-height'
        }
    },
    DATA: {
        TOTAL_SONGS: 'data.total-songs',
        MUSIC_LIBRARY: 'data.music-library',
        MUSIC_PATHS: 'data.music-paths',
        PLAYLISTS: 'data.playlists'
    }
}
