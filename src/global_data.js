const globalData = {}

export const apiHost = "http://127.0.0.1:8000/"

export function setGlobalData (key, val) {
  globalData[key] = val
}

export function getGlobalData (key) {
  return globalData[key]
}