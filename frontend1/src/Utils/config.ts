import packageJson from '../../package.json'

export const environment = import.meta.env.VITE_APP_MODE
export const secretKey = import.meta.env.VITE_APP_SECRET_KEY ?? 'unaChiaveSegreta'
export const authorization = import.meta.env.VITE_APP_AUTHORIZATION ?? 'authorization'
export const randomBg = 'https://source.unsplash.com/random?wallpapers'
export const mainColor = '#FF9F0A'
export const secondaryColor = '#1E1E1E'
export const Version = packageJson.version
export const kindeClientID = import.meta.env.VITE_APP_KINDE_CLIENT_ID
export const kindeDomain = import.meta.env.VITE_APP_KINDE_DOMAIN
export const kindeRedirect = import.meta.env.VITE_APP_KINDE_REDIRECT_URL
export const baseURL = import.meta.env.VITE_APP_BASE_URL
export const beUrl = import.meta.env.VITE_APP_BE_URL
export const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
