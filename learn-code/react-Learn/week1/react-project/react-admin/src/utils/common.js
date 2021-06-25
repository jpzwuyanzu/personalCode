import  Cookies from 'js-cookie'

export function getItem(key) {
    return Cookies.get(key)
}
export function setItem(key,value) {
     Cookies.set(key, value)
}
export function removeItem(key) {
    Cookies.removeItem(key)
}