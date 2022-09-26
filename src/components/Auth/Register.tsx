import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import api from '@/utils/api'
import { setUserToken } from '@/utils/localStorage'
import { CInput } from '../CInput'

export const Register = () => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('')

  const { dispatch } = useAuth()

  const setLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/signup', {
        name,
        email,
        password
      })
      
      
      dispatch({
        type: 'SET_LOGGED_USER',
        payload: data.user
      })

      setUserToken(data.token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login">      
      {/* <h3>Registrar</h3> */}
      <form onSubmit={setLogin}>
        <div className="login__content">
          <CInput 
            name="name"
            label="Name"
            placeholder="name here"
            onChange={setName}
            value={name}
          />
          <CInput 
            name="email"
            type="email"
            label="Email"
            placeholder="Email here"
            onChange={setEmail}
            value={email}
          />
          
          <CInput 
            name="password"
            type="password"
            label="Password"
            placeholder="Password here"
            onChange={setPassword}
            value={password}
          />

          <CInput 
            name="password_confirmation"
            type="password"
            label="Password Confirmation"
            placeholder="Password here"
            onChange={setPasswordConfirmation}
            value={passwordConfirmation}
          />

          <button type='submit'>Create account</button>
        </div>
      </form>
    </div>
  )
}