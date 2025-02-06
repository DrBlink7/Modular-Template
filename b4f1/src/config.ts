export type EnvType = keyof typeof EnvTypeEnum;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum EnvTypeEnum {
  'dev' = 'dev',
  'prod' = 'prod',
  'qa' = 'qa',
}
export const corsHost = process.env.ENABLE_CORS ?? '*'
export const serverPort = process.env.SERVER_PORT ?? 3002
export const dbUrl = process.env.DATABASE_URL
export const environmentName =
  (process.env.ENVIRONMENT_NAME as EnvType) ?? 'dev'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-member-access
export const version = require('../package.json').version
export const secretKey = process.env.STRIPE_SECRET_KEY
export const authUrl = process.env.AUTH_URL
export const successUrl = process.env.SUCCESS_URL
export const cancelUrl = process.env.CANCEL_URL
export const productPrice1 = process.env.PRODUCT_PRICE1
export const product1 = process.env.PRODUCT_ID1
export const productPrice2 = process.env.PRODUCT_PRICE2
export const product2 = process.env.PRODUCT_ID2
export const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET
