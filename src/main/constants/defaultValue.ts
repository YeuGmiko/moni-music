import { app } from 'electron'

export const DEFAULT_APP_STORE: App.Store = {
    state: {
        routeHomeName: 'music',
        theme: 'system',
        windowState: {
            isMaximized: false,
            windowWidth: 720,
            windowHeight: 450
        }
    },
    data: {
        totalSongs: [],
        musicLibrary: [app.getPath('music')],
        musicPaths: [],
        playlists: []
    }
}

export function noOverrideObjectAssign(target: any, source: any) {
    return Object.assign(JSON.parse(JSON.stringify(target)), source)
}

export const getAppStoreDefaultValue = (key: string): any => {
    const keys = key.split('.')
    let current = DEFAULT_APP_STORE

    for (const k of keys) {
        // 将带有 `-` 的属性名转换为驼峰命名
        const camelCaseKey = k.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())

        if (current && typeof current === 'object' && camelCaseKey in current) {
            current = current[camelCaseKey]
        } else {
            return undefined // Key not found
        }
    }

    return current
}
