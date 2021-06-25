import Cookie from 'js-cookie'

export function setItem (key, value) {
  Cookie.set(key, value)
}

export function getItem (key) {
  return Cookie.get(key)
}

export function removeItem (key) {
  Cookie.remove(key)
}
