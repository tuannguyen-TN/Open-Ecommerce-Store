import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import CheckoutFormDialog from './CheckoutFormDialog'

const CheckoutWrapper = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY as string)

  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormDialog />
    </Elements>
  )
}

export default CheckoutWrapper
