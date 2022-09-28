import { useEffect, useState, useRef } from 'react'
import { IMessage, useChat } from '@/context/ChatContext'

import './style.scss'
import { getMessages } from '@/utils/messages'
import { useAuth } from '@/context/AuthContext'
import readImg from '@/assets/img/read.png'
import unreadImg from '@/assets/img/unread.png'

export const Messages = () => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<IMessage[]>([])
  const { state: authState } = useAuth()
  const { state } = useChat()

  const loadMessages = async () => {
    setMessages([])
    const data = await getMessages(state.selectedUser.id)
    setMessages(data)
  }

  useEffect(() => {
    loadMessages()
  }, [state.selectedUser])
  
  useEffect(() => {
    if (state.newMessage && 
      (
        state.newMessage.senderId === state.selectedUser.id || 
        state.newMessage.receiverId === state.selectedUser.id
      )
    ) {
      const data = [...messages, state.newMessage] 
      setMessages(data)
    }
  }, [state.newMessage])

  useEffect(() => {
    if (state.readMessage) {
      const updatedMessages = messages.map((message) => message.id === state.readMessage?.id ? state.readMessage : message)
      setMessages(updatedMessages)
    }
  }, [state.readMessage])

  useEffect(() => {
    if (state.allMessageRead) {
      if (state.allMessageRead.otherUser === authState.user.id) {
        const updatedMessages = messages.map((message) => ({ ...message, read: true }))
        setMessages(updatedMessages)
      }
    }
  }, [state.allMessageRead])

  useEffect(() => {
    // scroll to bottom every time messages are changed
    if (messages.length) {
      const domNode = messagesRef.current
      if (domNode) {
        domNode.scrollTop = domNode.scrollHeight
      }
    }
  }, [messages])

  return (
    <div className="messages-list" ref={messagesRef}>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`bubble ${message.senderId === authState.user.id ? 'me' : 'other'}`}>
            <span>{message.message}</span>
            {message.senderId === authState.user.id && (
              <img className='status' src={message.read ? readImg : unreadImg} />
            )}
          </div>
        ))}        
      </div>
    </div>
  )
}