import { rest } from 'msw'
import { productsData } from '../test/productsData'
import { Product } from '../types/Product'
import { setupServer } from 'msw/node'

export const handlers = [
  rest.delete(
    'https://api.escuelajs.co/api/v1/products/:id',
    async (req, res, ctx) => {
      const { id } = req.params
      if (
        productsData.findIndex((item: Product) => item.id === Number(id)) !== -1
      ) {
        return res(ctx.json(true))
      }
      return res(ctx.json(false))
    }
  ),

  rest.get(
    'https://api.escuelajs.co/api/v1/products',
    async (req, res, ctx) => {
      return res(ctx.json(productsData))
    }
  ),

  rest.get(
    'https://api.escuelajs.co/api/v1/products/:id',
    async (req, res, ctx) => {
      const { id } = req.params
      const foundIndex = productsData.findIndex(
        (item: Product) => item.id === Number(id)
      )
      if (foundIndex !== -1) {
        return res(ctx.json(productsData[foundIndex]))
      }
      return res(ctx.json('Cannot fetch product'))
    }
  ),

  rest.post(
    'https://api.escuelajs.co/api/v1/products',
    async (req, res, ctx) => {
      let data: Product | {} = {}
      await req.json().then((res) => (data = res))
      return res(ctx.json({ id: 1, ...data }))
    }
  ),

  rest.put(
    'https://api.escuelajs.co/api/v1/products/:id',
    async (req, res, ctx) => {
      const { id } = req.params
      const foundIndex = productsData.findIndex(
        (item: Product) => item.id === Number(id)
      )
      if (foundIndex !== -1) {
        let data: Product | {} = {}
        await req.json().then((res) => (data = res))
        return res(
          ctx.json({ ...productsData[foundIndex], ...data } as Product)
        )
      }
      return res(ctx.json('Cannot update non-existing product'))
    }
  ),
]

const productServer = setupServer(...handlers)

export default productServer
