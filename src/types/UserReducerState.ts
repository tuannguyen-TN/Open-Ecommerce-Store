import { AuthorizedToken } from './AuthorziedToken'
import { User } from './User'

export interface UserReducerState {
  user: User | null
  fetching: boolean
  loggingIn: boolean
  isLoggedIn: boolean
  authorizedToken: AuthorizedToken | null
  error: string
}
