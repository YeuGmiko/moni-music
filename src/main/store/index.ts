import Store from 'electron-store'
import { getAppStoreDefaultValue } from '../constants/defaultValue'

const store = new Store()

store.clear()

function readOrWriteAndReturnDefault(storeKey: string, defaultValue: any) {
    const response = store.get(storeKey)
    if (response === undefined) {
        store.set(storeKey, defaultValue)
        return defaultValue
    }
    return response
}

function update(storeKey: string, value: any) {
    store.set(storeKey, value)
}

function del(storeKey: string) {
    store.delete(storeKey)
}

function clean() {
    store.clear()
}

function get(storeKey: string) {
    return readOrWriteAndReturnDefault(storeKey, getAppStoreDefaultValue(storeKey))
}

export { update, del, clean, get }
