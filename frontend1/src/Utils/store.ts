import * as ls from './ls'

// Utility functions for localStorage management
export const loadState = <T>(key: keyof typeof ls, defaultValue: T): T => {
  try {
    const serializedStore = ls.get(key as any)
    return serializedStore !== null && serializedStore !== undefined 
      ? serializedStore 
      : defaultValue
  } catch {
    return defaultValue
  }
}

export const saveState = <T>(key: keyof typeof ls, state: T): boolean => {
  try {
    ls.set(key as any, state)
    return ls.has(key as any)
  } catch {
    return false
  }
}

// Utility function for error formatting
export const formatError = (e: unknown, fallback: string): string => {
  if (e instanceof Error) {
    return e.message
  }
  if (typeof e === 'string') {
    return e
  }
  if (typeof e === 'object' && e !== null && 'message' in e) {
    return String((e as any).message)
  }
  return fallback
}
