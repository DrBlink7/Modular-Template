import packageJson from '../../package.json'

export const environment = import.meta.env.VITE_APP_MODE
export const secretKey = import.meta.env.VITE_APP_SECRET_KEY ?? 'unaChiaveSegreta'
export const authorization = import.meta.env.VITE_APP_AUTHORIZATION ?? 'authorization'
export const randomBg = 'https://source.unsplash.com/random?wallpapers'
export const mainColor = '#42047E'
export const secondaryColor = '#07F49E'
export const Version = packageJson.version
