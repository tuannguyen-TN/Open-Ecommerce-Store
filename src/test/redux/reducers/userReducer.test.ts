import { UserCredentials } from './../../../types/UserCredentials'
import { createStore } from '../../../redux/store/store'
import userServer from '../../../server/userServer'
import userReducer, {
  checkEmailAvailability,
  fetchSingleUserInfo,
  initialUserState,
  userLogin,
  userLogout,
  userRegister,
} from '../../../redux/reducers/userReducer'
import { access_token, users } from '../../usersData'
import { User } from '../../../types/User'
import { UserReducerState } from '../../../types/UserReducerState'

let store = createStore()

beforeEach(() => {
  store = createStore()
})

// Enable API mocking before tests.
beforeAll(() => userServer.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => userServer.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => userServer.close())

describe('Test asynchronous actions of userReducer', () => {
  test('Should login with valid user credentials', async () => {
    const res = await store
      .dispatch(
        userLogin({
          email: 'john@mail.com',
          password: 'changeme',
        } as UserCredentials)
      )
      .unwrap()

    expect(res.access_token).toBe(access_token + ' ' + users[0].id)
  })

  test('Should fail to login with invalid user credentials', async () => {
    const res = await store
      .dispatch(
        userLogin({
          email: 'john@mail.com',
          password: 'whoisjohn',
        } as UserCredentials)
      )
      .unwrap()

    expect(res).toMatchObject({
      message: 'Unauthorized',
      statusCode: 401,
    })
  })

  test('Should fetch user info with valid access token', async () => {
    const res = await store
      .dispatch(fetchSingleUserInfo('my-access-token 1'))
      .unwrap()

    expect(res).toMatchObject(users[0])
  })

  test('Should fail to fetch user info with invalid access token', async () => {
    const res = await store
      .dispatch(fetchSingleUserInfo('your-access-token 1'))
      .unwrap()

    expect(res).not.toMatchObject(users[0])
  })

  test('Should be true to check an email is already registered', async () => {
    const res = await store
      .dispatch(checkEmailAvailability('john@mail.com'))
      .unwrap()

    expect(res.isAvailable).toBe(true)
  })

  test('Should be false to check an email is not registered yet', async () => {
    const res = await store
      .dispatch(checkEmailAvailability('bin@mail.com'))
      .unwrap()

    expect(res.isAvailable).toBe(false)
  })

  test('Should register a new user with valid submitted values', async () => {
    const newUser: Partial<User> = {
      name: 'Rolling in the Deep',
      email: 'IT',
      password: '12345',
      avatar: 'https://ui-avatars.com/api/?name=Rolling%20In%20The%20Deep',
    }

    const res = await store.dispatch(userRegister(newUser)).unwrap()

    expect(res).toMatchObject({
      ...newUser,
      id: users.length + 1,
      role: 'customer',
    })
  })

  test('Should fail to register a new user with invalid submitted values', async () => {
    const newUser: Partial<User> = {
      name: '',
      email: '',
      password: '',
      avatar: '',
    }

    const res = await store.dispatch(userRegister(newUser)).unwrap()

    expect(res).toMatchObject({
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
  })
})

describe('Test synchronous actions of userReducer', () => {
  test('Should be able to log out user', () => {
    const state: UserReducerState = {
      user: null,
      fetching: false,
      loggingIn: false,
      isLoggedIn: true,
      authorizedToken: {
        access_token: access_token + ' 1',
        refresh_token: access_token,
      },
      error: '',
    }
    const newState = userReducer(state, userLogout())

    expect(newState).toMatchObject(initialUserState)
  })
})
