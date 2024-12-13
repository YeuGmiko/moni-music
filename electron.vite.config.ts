import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
        resolve: {
            alias: {
                '@common': resolve('src/common')
            }
        }
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
        resolve: {
            alias: {
                '@common': resolve('src/common')
            }
        }
    },
    renderer: {
        resolve: {
            alias: {
                '@': resolve('src/renderer/src'),
                '~': resolve('.'),
                '@common': resolve('src/common')
            }
        },
        plugins: [
            vue(),
            Components({
                resolvers: [NaiveUiResolver()]
            })
        ]
    }
})
