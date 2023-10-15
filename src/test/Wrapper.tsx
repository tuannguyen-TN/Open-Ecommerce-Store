import { Provider } from 'react-redux'
import store from '../redux/store/store'
import { PropsWithChildren } from 'react'

const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
  return <Provider store={store}>{children}</Provider>
}

export default Wrapper
