import { screen, waitFor } from '@testing-library/react'

import App from '../../App'
import appRender from './appRender'
import productServer from '../../server/productServer'

beforeAll(() => productServer.listen())
afterEach(() => productServer.resetHandlers())
afterAll(() => productServer.close())

describe('Test App component', () => {
  test('Should layout match snapshot', async () => {
    const { baseElement } = appRender(<App />)
    expect(baseElement).toMatchSnapshot()
    await waitFor(() => screen.findAllByText(/Open E-commerce Store/i))
    expect(screen.getAllByText(/Open E-commerce Store/i).length).toBe(1)
    expect(screen.getAllByText(/Featured Products/i).length).toBe(1)
  })
})
