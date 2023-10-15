import {
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItemQuantity,
} from '../../../redux/reducers/cartReducer'
import { createStore } from '../../../redux/store/store'
import { Product } from '../../../types/Product'
import { productsData } from '../../productsData'
import { CartItem } from './../../../types/CartItem'

let store = createStore()
const products: Product[] = productsData

beforeEach(() => {
  store = createStore()
})

describe('Test actions of cartReducer', () => {
  test('Should add product to cart', () => {
    store.dispatch(addToCart(products[0]))

    expect(store.getState().cartReducer[0]).toMatchObject({
      ...products[0],
      quantity: 1,
    } as CartItem)
  })

  test('Should add existing product to cart', () => {
    store.dispatch(addToCart(products[0]))
    store.dispatch(addToCart(products[0]))

    expect(store.getState().cartReducer[0]).toMatchObject({
      ...products[0],
      quantity: 2,
    } as CartItem)
  })

  test('Should remove product from cart', () => {
    store.dispatch(addToCart(products[0]))
    store.dispatch(removeFromCart(products[0].id))

    expect(store.getState().cartReducer.length).toBe(0)
  })

  test('Should update quantity of existing product in cart', () => {
    store.dispatch(addToCart(products[0]))
    store.dispatch(updateCartItemQuantity({ id: products[0].id, quantity: 11 }))

    expect(store.getState().cartReducer[0].quantity).toBe(11)
  })

  test('Should clear all items in cart', () => {
    store.dispatch(addToCart(products[0]))
    store.dispatch(addToCart(products[0]))

    expect(store.getState().cartReducer[0].quantity).toBe(2)

    store.dispatch(clearCart())

    expect(store.getState().cartReducer.length).toBe(0)
  })
})
