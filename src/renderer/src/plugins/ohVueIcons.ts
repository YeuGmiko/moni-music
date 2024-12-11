import { OhVueIcon, addIcons } from 'oh-vue-icons'
import * as IonIcons from 'oh-vue-icons/icons/io'
import * as PrimeIcons from 'oh-vue-icons/icons/pi'
import { App } from 'vue'

addIcons(...Object.values(IonIcons))
addIcons(...Object.values(PrimeIcons))

export function setupOhVueIcons(app: App) {
  app.component('VIcon', OhVueIcon)
}
