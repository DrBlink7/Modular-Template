import { effect } from './f'
import { secretKey } from './config'
import { type State } from '../types'
import CryptoJS from 'crypto-js'

interface LocalStorageMap {
  YOUR_PROJECT: State
}

export const set = <K extends keyof LocalStorageMap>(
  key: K,
  value: LocalStorageMap[K]
): void => { localStorage.setItem(key, encryptData(value)) }

export const has = (key: keyof LocalStorageMap): boolean =>
  Boolean(localStorage.getItem(key))

export const get = <K extends keyof LocalStorageMap>(
  key: K
): LocalStorageMap[K] | null => {
  const value = localStorage.getItem(key)

  if (value == null) return null

  try {
    return decryptData(value)
  } catch {
    return value as never
  }
}

export const del = (key: keyof LocalStorageMap): void => { localStorage.removeItem(key) }

export const clear = (): void => { localStorage.clear() }

export const cache = async <K extends keyof LocalStorageMap>(
  key: K,
  fetch: () => Promise<LocalStorageMap[K]>
): Promise<LocalStorageMap[K]> => {
  const cached = get(key)

  return (cached != null)
    ? await Promise.resolve<LocalStorageMap[K]>(cached)
    : await fetch().then(effect((x) => { set(key, x) }))
}

const encryptData = <K extends keyof LocalStorageMap>(
  data: LocalStorageMap[K]
): string => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString()

  return encryptedData
}

const decryptData = (encryptedData: string): LocalStorageMap[keyof LocalStorageMap] => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
  const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))

  return decryptedData
}
