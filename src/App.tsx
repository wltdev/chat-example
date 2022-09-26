import { useState } from 'react'

import { Chat } from './views/Chat'
import { Auth } from './views/Auth'
import './App.scss'

import { useAuth } from '@/context/AuthContext'

function App() {
  const { state } = useAuth()
  return (
    <div className="app">
      {state.isLogged && <Chat />}
      {!state.isLogged && <Auth />}
    </div>
  )
}

export default App
