import { IMessage } from "@/context/ChatContext"
import { FAKE_MESSAGES } from "./fakeData"
import api from './api'

export const getMessages = async (otherUser: string): Promise<IMessage[]> => {
  const { data } = await api.get('/api/messages', { params: { otherUser } })
  return data
}

export const storeMessage = (message: string, otherUser: string) => {
  return api.post('/api/messages', {
    message,
    otherUser
  })
}

export const updateMessage = (payload: IMessage) => {
  return api.put(`/api/messages/${payload.id}`, payload)
}

export const updateAllMessages = (otherUser: string) => {
  return api.put('/api/set-messages-read', { otherUser })
}