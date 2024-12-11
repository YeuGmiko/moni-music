import Store from 'electron-store'
import { ElectronStoreKey } from '@common/constants'
import { DEFAULT_APP_DATA, DEFAULT_APP_STATE } from '../constants/defaultValue'

const store = new Store()

// store.clear()

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
  return store.get(storeKey)
}

function fetchAppState(): App.State {
  return readOrWriteAndReturnDefault(ElectronStoreKey.APP_STATE, DEFAULT_APP_STATE)
}

function fetchAppData(): App.Data {
  return readOrWriteAndReturnDefault(ElectronStoreKey.APP_DATA, DEFAULT_APP_DATA)
}

export { fetchAppData, fetchAppState, update, del, clean, get }
