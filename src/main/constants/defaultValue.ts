import { app } from 'electron'
export const DEFAULT_APP_STATE: App.State = {
  HomeRouteName: 'music',
  Theme: 'system'
}
export const DEFAULT_APP_DATA: App.Data = {
  Songs: [],
  MusicLibrary: [app.getPath('music')],
  MusicPaths: []
}

export function noOverrideObjectAssign(target: any, source: any) {
  return Object.assign(JSON.parse(JSON.stringify(target)), source)
}
