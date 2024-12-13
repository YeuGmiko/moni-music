import { createApp } from 'vue'
import App from './App.vue'
import { setupComponents, setupOhVueIcons, setupPinia } from './plugins'
import { setupRouter } from './router'

import './plugins/assets'

function setupApp() {
    const app = createApp(App)
    setupPinia(app)
    setupOhVueIcons(app)
    setupRouter(app)
    setupComponents(app)
    app.mount('#app')
}

setupApp()
