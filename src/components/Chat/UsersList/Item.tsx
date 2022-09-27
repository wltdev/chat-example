import dayjs from 'dayjs'
import { IUser } from '@/context/AuthContext'
import profileImg from '@/assets/img/profile-1.jpg'
import { useChat } from '@/context/ChatContext'

type Props = {
  user: IUser
  isActive?: boolean
}

export const Item = ({ user }: Props) => {
  const { state, dispatch } = useChat()

  const setSelectUser = () => {
    dispatch({
      type: 'SET_SELECTED_USER',
      payload: user
    })
  }

  return (
    <div className={`item ${user.id === state.selectedUser.id && 'active'}`} onClick={setSelectUser}>
      <div className="item__info">
        <div className="item__photo">
          <img src={user.photo || profileImg} />
        </div>
        <div className="item__name">
          <span className="name">{user.name}</span>
          <span className="message">{user.latestMessage?.message}</span>
        </div>
      </div>
      <div className="item__date">
        {user.latestMessage && dayjs(user.latestMessage.createdAt).format('LT')}
      </div>
    </div>
  )
}