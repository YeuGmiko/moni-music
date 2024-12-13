import { createRouter, createWebHistory } from 'vue-router'
import { App } from 'vue'
import { routes } from '@/router/routes'

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 })
})

export function setupRouter(app: App) {
    app.use(router)
}
