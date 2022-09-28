import { IconSignout } from '@/components/Icons'
import { useAuth } from '@/context/AuthContext'
import './styles.scss'
import { logout } from '@/utils/localStorage'

export const UsersTop = () => {
  const { state: authState, dispatch } = useAuth()

  const signout = () => {
    logout()
    dispatch({
      type: 'SET_LOGOUT'
    })
  }

  return (
    <div className="users-top">
      {/* { authState.user.photo && <img src={authState.user.photo} />} */}
      <div className="users-top__name">
        Hi, <span>{authState.user.name}</span>
      </div>
      <div className='users-top__signout' onClick={signout}>
        <IconSignout />
      </div>
    </div>
  )
}
