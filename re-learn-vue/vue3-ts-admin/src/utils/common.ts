import Cookie from 'js-cookie'

export function setCookieItem (key: string, value: string) {
    Cookie.set(key, value)
}

export function getCookieItem (key: string): any {
    return Cookie.get(key)
}

export function removeCookieItem (key: string) {
    Cookie.remove(key)
}