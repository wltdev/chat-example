import "./styles.scss";
import React, { useState, useEffect } from "react";
import { SET_NEW_MESSAGE } from "@/context/mutations";
import { Socket } from "socket.io-client";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { IconEmoji, IconSend } from "../Icons";
import { useAuth } from "@/context/AuthContext";
import { storeMessage } from "@/utils/messages";
import { IMessage, useChat } from "@/context/ChatContext";

type Props = {
  socket: Socket | undefined
}

export const InputMessage = ({ socket }: Props) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const { state, dispatch } = useChat()
  const { state: authState } = useAuth()

  const sendMessage = async (e: React.FormEvent) => {
    setShowEmojiPicker(false)
    e.preventDefault()
    
    if (state.selectedUser.id && message.length) {
      const { data } = await storeMessage(
        message,
        state.selectedUser.id
      )

      dispatch({
        type: SET_NEW_MESSAGE,
        payload: data
      })

      if (socket) {
        socket.emit('send-message', data)
      }

      setMessage('')
    }
  }

  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent): void => {
    setMessage(`${message}${emojiData.emoji}`)
  }

  useEffect(() => {
    setShowEmojiPicker(false)
  }, [state.selectedUser])

  return (
    <>
      {showEmojiPicker &&
        <div className='emoji'>
          <div className='emoji__overlay' />
          <EmojiPicker onEmojiClick={onEmojiClick} />                  
        </div>
      }
      <form onSubmit={sendMessage}>
        <div className="input-message">
          <a className="write-link smiley" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <IconEmoji />
          </a>
          <input
            placeholder="Type your message here..."
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="write-link send" type="submit">
            <IconSend />
          </button>
        </div>
      </form>
    </>
  );
};
