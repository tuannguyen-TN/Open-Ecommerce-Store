type Role = 'customer' | 'admin'

export interface User {
  id: number
  name: string
  role: Role
  email: string
  password: string
  avatar: string
}
