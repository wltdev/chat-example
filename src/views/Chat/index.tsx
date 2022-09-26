import { Messages } from '@/components/Chat/Messages'
import { UsersList } from '@/components/Chat/UsersList'
import { InputMessage } from '@/components/InputMessage'
import { ChatTop } from '@/components/Chat/ChatTop'


export const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__users">
        <UsersList />
      </div>
      <div className="chat__messages">
        <ChatTop />
        <Messages />
        <InputMessage />
      </div>
    </div>
  )
}