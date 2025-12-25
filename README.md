# Bookstore Management System (Frontend)

This is the frontend for the Bookstore Management System microservices project. It is a Next.js 16 app (App Router) that talks to three backend services:

- Users service
- Products service
- Orders service

The backend services and their API details are documented in [backend/README.md](backend/README.md).

## Tech Stack

- Next.js 16 (App Router, TypeScript)
- React 19
- Tailwind CSS 4
- shadcn/ui-style components

## Getting Started (Local)

1. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set environment variables**

   Create a `.env` file at the project root (same place as `package.json`) and set the URLs of your backend services:

   ```bash
   NEXT_PUBLIC_USERS_SERVICE_URL=http://localhost:3001
   NEXT_PUBLIC_PRODUCTS_SERVICE_URL=http://localhost:3002
   NEXT_PUBLIC_ORDERS_SERVICE_URL=http://localhost:3003
   ```

   For production, these should point to your deployed backend services (for example, your Render URLs).

3. **Run the dev server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   Then open http://localhost:3000 in your browser.

## Build & Start (Production)

```bash
npm run build
npm run start
# or
pnpm build
pnpm start
```

By default the app listens on port 3000.

## Environment Variables

The frontend uses these public env variables (available in the browser):

- `NEXT_PUBLIC_USERS_SERVICE_URL` – Base URL of the users service (must expose `/users` endpoints).
- `NEXT_PUBLIC_PRODUCTS_SERVICE_URL` – Base URL of the products service (must expose `/products` endpoints).
- `NEXT_PUBLIC_ORDERS_SERVICE_URL` – Base URL of the orders service (must expose `/orders` endpoints).

## Deploying to Render (Frontend)

When creating a Render **Web Service** for the frontend:

- **Environment / Runtime**: Node
- **Build command**: `npm install && npm run build`
- **Start command**: `npm run start`
- **Env vars**: set the three `NEXT_PUBLIC_*` URLs to your deployed backend services.

Render will build the Next.js app and run it with `next start` as a Node web service.
