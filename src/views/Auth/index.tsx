import React, { useState } from 'react'
import { Login } from '@/components/Auth/Login'
import { Register } from '@/components/Auth/Register'
import logoImg from '@/assets/img/logo.png'

export const Auth = () => {
  const [registring, setRegistring] = useState(false)

  return (
    <div className="auth">
      <div className="auth__header">
        <img src={logoImg} />
        <p>Chat Example</p>
      </div>

      {!registring && <Login />} 
      {registring && <Register />}

      <div className="auth__footer">
        <p>Or</p>
        <a onClick={() => setRegistring(!registring)}>{!registring ? 'Register' : 'Back'}</a>
      </div>
    </div>
  )
}