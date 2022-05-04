import Cookie from 'js-cookie'

export function setCookieItem (key, value) {
    Cookie.set(key, value)
}

export function getCookieItem (key, value) {
    return Cookie.get(key)
}

export function removeCookieItem (key) {
    Cookie.remove(key)
}