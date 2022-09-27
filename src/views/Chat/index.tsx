import { useRef, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Messages } from '@/components/Chat/Messages'
import { UsersList } from '@/components/Chat/UsersList'
import { InputMessage } from '@/components/InputMessage'
import { ChatTop } from '@/components/Chat/ChatTop'
import { UsersTop } from '@/components/Chat/UsersTop'
import { config } from '@/config'
import { IUser, useAuth } from '@/context/AuthContext'
import { IMessage, useChat } from '@/context/ChatContext'
import { updateMessage, updateAllMessages } from '@/utils/messages'
import { SET_NEW_MESSAGE, SET_READ_MESSAGE, SET_READ_MESSAGE_ALL } from '@/context/mutations'

export const Chat = () => {
  const selectedUser = useRef<IUser>()
  const { state: authState } = useAuth()
  const { state, dispatch } = useChat()
  const socket = useRef<Socket>()

  const setSelectedUser = async () => {
    selectedUser.current = state.selectedUser
    await updateAllMessages(state.selectedUser.id)
  
    if (socket.current) {
      socket.current.emit('set-all-messages-read', {
        otherUser: selectedUser.current.id,
        senderId: authState.user.id
      })
    }
  }

  useEffect(() => {
    if (state.selectedUser) {
      setSelectedUser()
    }
  }, [state.selectedUser])

  useEffect(() => {
    socket.current = io(config.apiUrl)
    socket.current.emit('add-user', authState.user.id)
  }, [])
  
  useEffect(() => {
    if (socket.current) {
      socket.current.on('message-recieve', async (data: IMessage) => {
        dispatch({
          type: SET_NEW_MESSAGE,
          payload: data
        })        

        if (selectedUser.current && selectedUser.current.id === data.senderId) {
          await updateMessage({
            ...data,
            read: true
          })

          socket.current?.emit('set-message-read', {
            ...data,
            otherUser: data.senderId,
            read: true
          })
        }
      })

      socket.current.on('message-read', (data: IMessage) => {
        dispatch({
          type: SET_READ_MESSAGE,
          payload: {
            ...data,
            read: true
          }
        })
      })

      socket.current.on('all-messages-read', (data: { senderId: string, otherUser: string }) => {
        dispatch({
          type: SET_READ_MESSAGE_ALL,
          payload: data
        })
      })

    }
  }, [socket])

  return (
    <div className="chat">
      <div className="chat__users">
        <UsersTop />
        <UsersList />
      </div>
      <div className="chat__messages">
        <ChatTop />
        <Messages />
        <InputMessage socket={socket.current} />
      </div>
    </div>
  )
}