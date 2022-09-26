import React, { ReactNode, useReducer, createContext, useContext } from 'react'
import { IMessage } from './ChatContext'

export interface IUser {
  id: string
  name?: string
  email?: string
  photo?: string
  latest?: IMessage
}

interface State {
  user: IUser
  isLogged: boolean
}

const DEFAULT_VALUE: State = {
  user: { id: 'fake-1' },
  isLogged: true
}

export type ActionType = {
  type: string
  payload?: any
}

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
  case 'SET_LOGGED_USER':
    return {
      ...state,
      user: action.payload,
      isLogged: true
    }
  case 'SET_LOGOUT':
    return {
      ...state,
      user: {},
      isLogged: false
    }
  case 'RESET':
    return {
      user: {},
      isLogged: false
    }
  default:
    throw new Error()
  }
}

export const AuthContext = createContext<{
  state: State
  dispatch: React.Dispatch<ActionType>
}>({
  state: DEFAULT_VALUE,
  dispatch: () => undefined
})

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_VALUE)
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('Use AuthContext is missing')

  return context
}