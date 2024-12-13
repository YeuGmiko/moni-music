import type { Component } from 'vue'
import Songs from './tabs/songs/index.vue'
import Albums from './tabs/albums/index.vue'

interface TabConfig {
    label: string
    name: string
    component: Component
}

export const tabs: TabConfig[] = [
    {
        label: '歌曲',
        name: 'songs',
        component: Songs
    },
    {
        label: '专辑',
        name: 'albums',
        component: Albums
    }
]
