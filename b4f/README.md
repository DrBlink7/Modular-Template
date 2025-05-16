# B4F
Node backend, copy .env.example vars in .env file (you should create it) and ask [me](https://github.com/DrBlink7) on how to fill vars.
It will run (by default) on 3001 port, you can see API Swagger [there](http://localhost:3001/swagger/)

To run BE
```sh
stripe login
stripe listen --forward-to http://localhost:3001/api/payments/webhook
```
copy and set
```sh
STRIPE_WEBHOOK_SECRET=
```
with the corresponding value, then
```sh
docker compose up --build b4f
docker compose exec b4f yarn prisma migrate dev
```
Set ```SERVER_PORT``` (default is 3001), ```ENABLE_CORS``` (ex. *) and desired ```ENVIRONMENT_NAME``` (ex. dev, qa or prod) to run Node BE.

## Kinde
You need to configure your kinde and then set your env AUTH_URL corresponding to your kinde public url.

Remember that if you need M2M, you need to set M2M application, enabling Kinde Management APIs and give all scope needed to Access Token.

## Stripe
You need to configure your stripe to have two products to sell, then you need to set these env vars:
```sh
STRIPE_SECRET_KEY= #the secret key you find on stripe dashboard
SUCCESS_URL= #the desired frontend url redirect for payment success
CANCEL_URL= #the desired frontend url redirect for payment error
PRODUCT_ID1= #the id of the first product you find on stripe dashboard
PRODUCT_PRICE1= #the price key of the first product you find on stripe dashboard
PRODUCT_ID2= #the id of the second product you find on stripe dashboard
PRODUCT_PRICE2= #the price key of the second product you find on stripe dashboard
```
### Webhooks
You can set webhook on your [stripe dashboard](https://dashboard.stripe.com/test/workbench/webhooks) and then set the env var
```sh
STRIPE_WEBHOOK_SECRET=
```

Otherwise you can enable the listener for stripe webhooks locally
1. ```brew install stripe/stripe-cli/stripe```
2. ```stripe login```
3. set the listener to run on your BE ```stripe listen --forward-to localhost:3001/api/payments/webhook``` you will receive a Webhook Secret key, you need to set the corresponding ```STRIPE_WEBHOOK_SECRET``` env var and restart your BE docker container (if you have it already running)

## DB
Db is postres, set DATABASE_URL according to your settings or use the contenerized one:
```sh
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```
default value, coming from docker compose, is DATABASE_URL="postgresql://dev:devPassword@db:5432/postgres?schema=public"

## Prisma
We use Prisma as Orm and migration tool
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

### Create a migration
```sh
docker compose exec b4f yarn prisma migrate dev --name migration_name
```

### Execute a migration
```sh
docker compose exec b4f yarn prisma migrate dev
```
or
```sh
docker compose exec b4f yarn prisma migrate deploy
```
for production