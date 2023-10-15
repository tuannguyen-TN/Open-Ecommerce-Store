import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { useState } from 'react'
import { StripeCardNumberElement } from '@stripe/stripe-js'

import { useAppDispatch } from '../hooks/useAppDispatch'
import { clearCart } from '../redux/reducers/cartReducer'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'
import { useOptions } from '../hooks/useOptions'
import { toast } from 'react-toastify'

const CheckoutFormDialog = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { user } = useAppSelector((state: StateType) => state.userReducer)
  const [name, setName] = useState<string>(user ? user.name : '')
  const [email, setEmail] = useState<string>(user ? user.email : '')
  const cart = useAppSelector((state: StateType) => state.cartReducer)
  const totalAmount = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  )
  const dispatch = useAppDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement) as StripeCardNumberElement,
      billing_details: {
        name,
        email,
      },
    })

    if (
      payload &&
      payload.paymentMethod?.billing_details.name &&
      payload.paymentMethod?.card?.last4 &&
      payload.paymentMethod?.billing_details.email
    ) {
      alert(
        `Order confirmation:
        Name: ${payload.paymentMethod?.billing_details.name}
        Email: ${payload.paymentMethod?.billing_details.email}
        Card number: ${payload.paymentMethod?.card?.last4}
        Total amount: $${totalAmount}
        Transaction status: Complete`
      )
      toast.success('Payment complete!')
      dispatch(clearCart())
      setOpen(false)
    }
  }

  return (
    <Box>
      <Button
        disabled={cart.length === 0 || !stripe}
        variant="contained"
        onClick={handleClickOpen}
      >
        Checkout
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Payment information</DialogTitle>
        <DialogContent>
          <Stack direction="column" justifyContent="flex-start" spacing={2}>
            <TextField
              variant="standard"
              label="Name"
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="standard"
              label="Email address"
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>
              Card number
              <CardNumberElement options={options} />
            </label>
            <label>
              Expiration date
              <CardExpiryElement options={options} />
            </label>
            <label>
              CVC
              <CardCvcElement options={options} />
            </label>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CheckoutFormDialog
