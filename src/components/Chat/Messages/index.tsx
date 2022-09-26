import { useEffect, useState, useRef } from 'react'
import { IMessage, useChat } from '@/context/ChatContext'

import './style.scss'
import { getMessages } from '@/utils/messages'
import { useAuth } from '@/context/AuthContext'

export const Messages = () => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<IMessage[]>([])
  const { state: authState } = useAuth()
  const { state } = useChat()

  const loadMessages = () => {
    const users = [authState.user.id, state.selectedUser.id]
    const data = getMessages(users)
    setMessages(data)
  }

  useEffect(() => loadMessages(), [])
  
  useEffect(() => {
    if (state.newMessage) {
      setMessages([...messages, state.newMessage])
    }
  }, [state.newMessage])

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
            <span>{message.body}</span>
          </div>
        ))}        
      </div>
    </div>
  )
}