import { ReactElement } from 'react'
import { RenderOptions, render } from '@testing-library/react'
import Wrapper from '../Wrapper'

const appRender = (component: ReactElement, options: RenderOptions = {}) => {
  return {
    ...render(component, { wrapper: Wrapper, ...options }),
  }
}

export default appRender
