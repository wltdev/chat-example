import { useChat } from '@/context/ChatContext'
import './styles.scss'

export const ChatTop = () => {
  const { state } = useChat()
  return (
    <div className="chat-top">
      { state.selectedUser.photo && <img className="chat-top__photo" src={state.selectedUser.photo} />}
      <h3 className="chat-top__name">{state.selectedUser.name}</h3>
    </div>
  )
}
