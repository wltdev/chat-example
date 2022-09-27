import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import api from '@/utils/api'
import { setLocalUser, setUserToken } from '@/utils/localStorage'
import { CInput } from '../CInput'

export const Login = () => {
  const [registring, setRegistring] = useState(false)
  const [ email, setEmail ] = useState('user1@test.com')
  const [ password, setPassword ] = useState('123456')

  const { dispatch } = useAuth()

  const setLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/signin', {
        email,
        password
      })      
      
      dispatch({
        type: 'SET_LOGGED_USER',
        payload: data.user
      })

      setLocalUser(data.user)
      setUserToken(data.token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login">      
      {/* <h3>Login</h3> */}
      <form onSubmit={setLogin}>
        <div className="login__content">
          <CInput 
            name="email"
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

          <button type='submit'>signin</button>
        </div>
      </form>
    </div>
  )
}