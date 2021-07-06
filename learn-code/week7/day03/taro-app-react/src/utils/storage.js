export function setItem(key, value) {
  wx.setStorageSync(key, value)
}

export function getItem(key) {
  return wx.getStorageSync(key)
}

export function removeItem(key) {
  wx.removeStorageSync(key)
}

export function clear() {
  wx.clearStorageSync()
}