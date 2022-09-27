import { IUser } from '@/context/AuthContext'

const USER_DATA = '@chat-user'
const USER_TOKEN = '@chat-token'

export const setLocalUser = (user: IUser) =>
  window.localStorage.setItem(USER_DATA, JSON.stringify(user))

export const getLocalUser = () => {
  const data = window.localStorage.getItem(USER_DATA)

  if (data) return JSON.parse(data)

  return
}

export const setUserToken = (token: string) => window.localStorage.setItem(USER_TOKEN, token)
export const getUserToken = () => window.localStorage.getItem(USER_TOKEN)

export const logout = () => {
  window.localStorage.removeItem(USER_TOKEN)
  window.localStorage.removeItem(USER_DATA)
}