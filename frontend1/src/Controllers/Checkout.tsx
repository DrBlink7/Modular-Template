import { FC, useState, type FormEvent } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

const CheckoutForm: FC = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (stripe == null || elements == null) return

    setLoading(true)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!
    })

    if (error) {
      console.error(error)
    } else {
      console.log('PaymentMethod:', paymentMethod)
    }

    setLoading(false)
  }

  return <form onSubmit={handleSubmit}>
    <CardElement />
    <button type="submit" disabled={!stripe || loading}>
      {loading ? 'Processing...' : 'Pay'}
    </button>
  </form>
}

export default CheckoutForm
