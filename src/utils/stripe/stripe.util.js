import { loadStripe } from '@stripe/stripe-js';

//this key is stored in .env
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);