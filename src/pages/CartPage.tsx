import { Box, Button, Grid, Stack, Typography } from '@mui/material'

import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { CartItem } from '../types/CartItem'
import SingleListItemDisplay from '../components/SingleListItemDisplay'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { clearCart } from '../redux/reducers/cartReducer'
import CheckoutWrapper from '../components/CheckoutWrapper'

const CartPage = () => {
  const cart = useAppSelector((state: StateType) => state.cartReducer)
  const dispatch = useAppDispatch()
  const totalCartPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  )

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Typography variant="h4">Your Cart</Typography>
        <Typography variant="h4">Total: ${totalCartPrice}</Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
        sx={{ py: 2 }}
      >
        <Button
          disabled={cart.length === 0}
          variant="contained"
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </Button>
        <CheckoutWrapper />
      </Stack>
      <Grid container spacing={4}>
        {cart.map((item: CartItem) => (
          <SingleListItemDisplay
            containQuantity={true}
            item={item}
            key={item.id}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default CartPage
