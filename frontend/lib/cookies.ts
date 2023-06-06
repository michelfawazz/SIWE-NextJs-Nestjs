import { getCookie as _getCookie, setCookie as _setCookie, deleteCookie } from 'cookies-next'

const MAX_AGE = 24 * 60 * 60

export const setCookie = (key: string, value: any) => {
  _setCookie(key, value, {
    path: '/',
    maxAge: MAX_AGE
  })
}

export const getCookie = (key: string) => {
  const value = _getCookie(key, {
    path: '/',
    maxAge: MAX_AGE
  })

  return value
}

export const removeCookie = (key: string) => {
  deleteCookie(key, {
    path: '/',
    maxAge: MAX_AGE
  })
}