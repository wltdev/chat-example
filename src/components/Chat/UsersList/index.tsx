import { useEffect, useState } from 'react'
import './style.scss'
import { Item } from './Item'
import { useChat } from '@/context/ChatContext'
import { IUser, useAuth } from '@/context/AuthContext'
import { getUsers, sortUsers } from '@/utils/users'

export const UsersList = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const { state } = useChat()
  const { state: authState } = useAuth()

  const loadUsers = () => {
    const data = getUsers()
    setUsers(data)
  }

  const handlerUsers = () => {
    if (state.newMessage) {
      const sorted: IUser[] = sortUsers(users, state.newMessage, authState.user)
      setUsers(sorted)
    }
  }

  useEffect(() => loadUsers(), [])
  useEffect(() => handlerUsers(), [state.newMessage])

  return (
    <div className="list">
      {users.map((user, index) => <Item key={user.id} user={user} />)}
    </div>
  )
}