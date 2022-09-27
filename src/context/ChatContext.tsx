import React, { ReactNode, useReducer, createContext, useContext } from 'react'
import { IUser } from './AuthContext'
import { SET_NEW_MESSAGE, SET_SELECTED_USER, SET_USERS, SET_READ_MESSAGE, SET_READ_MESSAGE_ALL } from './mutations'

export interface IMessage {
  id: string
  message: string
  createdAt: string
  receiverId: string
  senderId: string
  read: boolean
}

type ALL_READ = {
  otherUser: string
  senderId: string
}

interface State {
  users: IUser[]
  selectedUser: IUser
  newMessage?: IMessage
  readMessage?: IMessage
  allMessageRead?: ALL_READ
}

const DEFAULT_VALUE: State = {
  users: [],
  selectedUser: { id: '' }
}

export type ActionType = {
  type: string
  payload?: any
}

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
  case SET_USERS:
    return {
      ...state,
      users: action.payload
    }
  case SET_SELECTED_USER:
    return {
      ...state,
      selectedUser: action.payload
    }
  case SET_NEW_MESSAGE:
    return {
      ...state,
      newMessage: action.payload
    }
  case SET_READ_MESSAGE:
    return {
      ...state,
      readMessage: action.payload
    }
  case SET_READ_MESSAGE_ALL:
    return {
      ...state,
      allMessageRead: action.payload
    }
  case 'RESET':
    return {
      users: [],
      selectedUser: { id: '' }
    }
  default:
    throw new Error()
  }
}

export const ChatContext = createContext<{
  state: State
  dispatch: React.Dispatch<ActionType>
}>({
  state: DEFAULT_VALUE,
  dispatch: () => undefined
})

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_VALUE)
  return <ChatContext.Provider value={{ state, dispatch }}>{children}</ChatContext.Provider>
}

export const useChat = () => {
  const context = useContext(ChatContext)

  if (!context) throw new Error('Use ChatContext is missing')

  return context
}