import { IMessage } from './../context/ChatContext';
import { IUser } from './../context/AuthContext';
import { FAKE_USERS } from "./fakeData"

export const getUsers = () => {
  return FAKE_USERS
}

export const sortUsers = (users: IUser[], newMessage: IMessage, loggedUser: IUser) => {
  let findUser: IUser | undefined
  if (newMessage.senderId === loggedUser.id) {
    findUser = users.find((user) => user.id === newMessage.receiverId)
  } else {
    findUser = users.find((user) => user.id === newMessage?.senderId)
  }
  
  if (findUser) {
    const oldUsersList = users.filter((user) => findUser && user.id !== findUser.id)
    const userData = {
      ...findUser,
      latest: newMessage
    }
    const newUsersList = [userData, ...oldUsersList]
    return newUsersList
  }

  return users
}