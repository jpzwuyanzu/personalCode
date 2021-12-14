import Cookies from 'js-cookie'

export function setItem (key, value) {
    Cookies.set(key, value)
}

export function getItem (key) {
    return Cookies.get(key)
}

export  function removeItem (key) {
    Cookies.remove(key)
}