# fauna-next-auth0-example

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

Clone this repository

```bash
git clone https://github.com/fgiuliani/fauna-next-auth0-example fauna-next-auth0-example
```

Switch into the newly created folder

```bash
cd fauna-next-auth0-example
```

Install the necessary node packages

```bash
npm install
```

Duplicate `.env.local.example` and rename it as `.env.local`. Put the necessary data inside in order to be able to run the project.

```
FAUNA_SERVER_KEY=[FAUNA_SERVER_KEY]

NEXT_PUBLIC_AUTH0_CLIENT_ID=[Can be found in the Auth0 dashboard under settings]
NEXT_PUBLIC_AUTH0_DOMAIN=[Can be found in the Auth0 dashboard under settings]

AUTH0_CLIENT_SECRET=[Can be found in the Auth0 dashboard under settings]
SESSION_COOKIE_SECRET=[A unique secret used to encrypt the cookies, has to be at least 32 characters]
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
