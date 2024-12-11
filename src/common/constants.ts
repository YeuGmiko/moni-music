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
  FETCH_APP_DATA_SONGS: 'fetch-app-data-songs',
  FETCH_SONG_COVER: 'fetch-song-cover',
  FETCH_MUSIC_DATA_URL: 'request-music-data-url',
  UPDATE_MUSIC: 'update-music'
}
export const StateChannel = {
  FETCH_APP_STATE: 'fetch-app-state',
  FETCH_MUSIC_LIBRARY: 'fetch-music-library',
  FETCH_MUSIC_PATHS: 'fetch-music-paths',
  UPDATE_APP_STATE: 'update-app-state',
  UPDATE_MUSIC_LIBRARY: 'update-music-library',
  UPDATE_MUSIC_PATHS: 'update-music-library'
}

export const ElectronStoreKey = {
  APP: 'app',

  APP_STATE: 'app.state',

  APP_STATE_HOME_ROUTE_NAME: 'app.state.HomeRouteName',
  APP_STATE_THEME: 'app.state.Theme',

  APP_DATA: 'app.data',

  APP_DATA_MUSIC_LIBRARY: 'app.data.MusicLibrary',
  APP_DATA_MUSIC_PATHS: 'app.data.MusicPaths',
  APP_DATA_SONGS: 'app.data.Songs'
}
