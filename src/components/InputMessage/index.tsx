import React, { useState } from "react";
import { IMessage, useChat } from "@/context/ChatContext";
import { SET_NEW_MESSAGE } from "@/context/mutations";
import { IconEmoji, IconSend } from "../Icons";
import "./styles.scss";
import { useAuth } from "@/context/AuthContext";

export const InputMessage = () => {
  const [message, setMessage] = useState("");
  const { state, dispatch } = useChat()
  const { state: authState } = useAuth()

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (state.selectedUser.id && message.length) {
      const messageData: IMessage = {
        id: String(new Date()),
        body: message,
        receiverId: state.selectedUser.id,
        createdAt: '',
        read: false,
        senderId: authState.user.id
      }

      dispatch({
        type: SET_NEW_MESSAGE,
        payload: messageData
      })

      setMessage('')
    }
  }

  return (
    <form onSubmit={sendMessage}>
      <div className="input-message">
        <a className="write-link smiley">
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
  );
};
