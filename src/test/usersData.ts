import { User } from '../types/User'

export const access_token = 'my-access-token'

export const users: User[] = [
  {
    id: 1,
    email: 'john@mail.com',
    password: 'changeme',
    name: 'Jhon',
    role: 'customer',
    avatar: 'https://i.imgur.com/DumuKkD.jpeg',
  },
  {
    id: 2,
    email: 'maria@mail.com',
    password: '12345',
    name: 'Maria',
    role: 'customer',
    avatar: 'https://i.imgur.com/00qWleT.jpeg',
  },
  {
    id: 3,
    email: 'admin@mail.com',
    password: 'admin123',
    name: 'Admin',
    role: 'admin',
    avatar: 'https://i.imgur.com/5mPmJYO.jpeg',
  },
]
