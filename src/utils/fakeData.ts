import { IUser } from './../context/AuthContext';
import { IMessage } from "@/context/ChatContext";

export const FAKE_MESSAGES: IMessage[] = [
  {
    id: 'asdasd',
    body: 'something cool',
    createdAt: '2022-09-24',
    read: false,
    receiverId: 'fake-1',
    senderId: 'fake-2'

  },
  {
    body: 'something cool',
    createdAt: '2022-09-24',
    id: 'asdasd2',
    read: false,
    receiverId: 'fake-2',
    senderId: 'fake-1'
  },
  {
    body: 'something cool',
    createdAt: '2022-09-24',
    id: 'asdasd3',
    read: false,
    receiverId: 'fake-2',
    senderId: 'fake-1'
  },
  {
    body: 'something cool',
    createdAt: '2022-09-24',
    id: 'asdasd4',
    read: false,
    receiverId: 'fake-1',
    senderId: 'fake-2'
  },
  {
    body: 'something cool',
    createdAt: '2022-09-24',
    id: 'asdasd5',
    read: false,
    receiverId: 'fake-1',
    senderId: 'fake-2'
  },
  {
    body: 'something cool',
    createdAt: '2022-09-24',
    id: 'asdasd6',
    read: false,
    receiverId: 'fake-2',
    senderId: 'fake-1'
  },
]

export const FAKE_USERS: IUser[] = [
  {
    id: 'fake-1',
    name: 'Sophie fake-1',
    photo: ''
  },
  {
    id: 'fake-2',
    name: 'Sophie fake-2',
    photo: ''
  },
  {
    id: 'fake-3 fake-3',
    name: 'Sophie',
    photo: ''
  },
  {
    id: 'fake-4',
    name: 'Sophie fake-4',
    photo: ''
  },
  {
    id: 'fake-5',
    name: 'Sophie',
    photo: ''
  },
  {
    id: 'fake-6',
    name: 'Sophie',
    photo: ''
  },
  {
    id: 'fake-7',
    name: 'Sophie',
    photo: ''
  },
  {
    id: 'fake-8',
    name: 'Sophie',
    photo: ''
  },
  {
    id: 'fake-9',
    name: 'Sophie',
    photo: ''
  },
  {
    id: 'fake-10',
    name: 'Sophie',
    photo: ''
  },
  {
    id: 'fake-11',
    name: 'Sophie',
    photo: ''
  },
]