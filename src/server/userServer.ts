import { rest } from 'msw'
import { users, access_token } from '../test/usersData'
import { User } from '../types/User'
import { setupServer } from 'msw/node'

export const handlers = [
  // user login
  rest.post(
    'https://api.escuelajs.co/api/v1/auth/login',
    async (req, res, ctx) => {
      const { email, password } = await req.json()
      const foundIndex = users.findIndex(
        (item: User) => email === item.email && password === item.password
      )
      if (foundIndex > -1) {
        return res(
          ctx.json({
            access_token: access_token + ' ' + users[foundIndex].id,
            refresh_token: access_token,
          })
        )
      }
      res(ctx.status(401))
      return res(
        ctx.json({
          message: 'Unauthorized',
          statusCode: 401,
        })
      )
    }
  ),

  // fetch user info from token
  rest.get(
    'https://api.escuelajs.co/api/v1/auth/profile',
    async (req, res, ctx) => {
      const tokenArr = req.headers.get('Authorization')?.split(' ')
      if (tokenArr) {
        const token = tokenArr[1]
        const userId = tokenArr[2]
        const foundIndex = users.findIndex(
          (item: User) => item.id === Number(userId)
        )
        if (token === access_token && foundIndex > -1) {
          return res(ctx.json(users[foundIndex]))
        }
      }
      res(ctx.status(401))
      return res(
        ctx.json({
          message: 'Unauthorized',
          statusCode: 401,
        })
      )
    }
  ),

  // check email availability
  rest.post(
    'https://api.escuelajs.co/api/v1/users/is-available',
    async (req, res, ctx) => {
      const { email } = await req.json()
      const foundIndex = users.findIndex((item: User) => email === item.email)
      if (foundIndex > -1) {
        return res(
          ctx.json({
            isAvailable: true,
          })
        )
      }
      return res(
        ctx.json({
          isAvailable: false,
        })
      )
    }
  ),

  // user register
  rest.post('https://api.escuelajs.co/api/v1/users/', async (req, res, ctx) => {
    const newUser = await req.json()
    const valuesArr = Object.entries(newUser)

    for (let i = 0; i < valuesArr.length; i++) {
      if (!valuesArr[i][1]) {
        res(ctx.status(400))
        return res(
          ctx.json({
            message: [
              'email should not be empty',
              'email must be an email',
              'name should not be empty',
              'password must be longer than or equal to 4 characters',
              'password should not be empty',
              'password must contain only letters and numbers',
              'avatar should not be empty',
              'avatar must be a URL address',
            ],
            error: 'Bad Request',
            statusCode: 400,
          })
        )
      }
    }
    return res(ctx.json({ ...newUser, id: users.length + 1, role: 'customer' }))
  }),
]

const userServer = setupServer(...handlers)

export default userServer
