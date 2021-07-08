import Cookie from 'js-cookie'

export function setItem (key: any, value: any) {
  Cookie.set(key, value)
}

export function getItem (key: any) {
  return Cookie.get(key)
}

export function removeItem (key: any) {
  Cookie.remove(key)
}
