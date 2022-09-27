import { useEffect } from 'react'

import { Chat } from './views/Chat'
import { Auth } from './views/Auth'
import './App.scss'

import { useAuth } from '@/context/AuthContext'
import { getLocalUser } from './utils/localStorage'

function App() {
  const { state, dispatch } = useAuth()

  const getUserData = () => {
    const user = getLocalUser()
    
    if (user) {
      dispatch({
        type: 'SET_LOGGED_USER',
        payload: user
      })
    }
  }

  useEffect(() => getUserData(), [])

  return (
    <div className="app">
      {state.isLogged && <Chat />}
      {!state.isLogged && <Auth />}
    </div>
  )
}

export default App
