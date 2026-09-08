# Swift Store

A full-stack furniture e-commerce app built with Next.js. Browse products, save favorites, leave reviews, and check out with Stripe — with a protected admin dashboard for catalog and sales management.

**Live demo:** [swift-store-sandy.vercel.app](https://swift-store-sandy.vercel.app)

---

## Features

**Storefront**

- Home page with hero carousel and featured products
- Product catalog with debounced search, plus grid/list layout toggle
- Product detail pages with ratings, share links, and add-to-cart
- Light and dark mode

**Customer account** (sign-in required)

- Clerk authentication (sign in / sign up modals)
- Favorites
- Reviews (one per product, editable from a dedicated reviews page)
- Persistent cart with quantity updates, tax, and shipping
- Stripe Embedded Checkout
- Order history after a successful payment

**Admin dashboard** (admin user only)

- Create, update, and delete products
- Product image uploads to Supabase Storage
- Sales overview of paid orders

---

## Tech stack

| Layer      | Tools                                          |
| ---------- | ---------------------------------------------- |
| Framework  | Next.js 14 (App Router), React 18, TypeScript  |
| UI         | Tailwind CSS, shadcn/ui, Radix UI, next-themes |
| Auth       | Clerk                                          |
| Database   | PostgreSQL via Prisma 7 (`@prisma/adapter-pg`) |
| Storage    | Supabase Storage                               |
| Payments   | Stripe Checkout (embedded)                     |
| Validation | Zod                                            |
| Forms      | Next.js Server Actions                         |

---

## How it works

The app is a Next.js App Router project. Public pages (home, about, products) render without an account. Clerk middleware protects everything else, and `/admin` is limited to a single user whose Clerk ID matches `ADMIN_USER_ID`.

**Data and mutations** live in server actions (`utils/actions.ts`). Product, cart, favorite, review, and order logic runs on the server, talks to Prisma, then revalidates the relevant route. Forms are validated with Zod before anything is written.

**Images** uploaded in the admin dashboard go to a public Supabase Storage bucket (`swift-store`). The public URL is stored on the product record.

**Checkout flow**

1. A signed-in user adds items to their cart. Totals include a 10% tax and a $5 shipping fee.
2. Placing the order creates an unpaid `Order` and redirects to `/checkout`.
3. `/api/payment` opens a Stripe Embedded Checkout session from the cart line items.
4. After payment, `/api/confirm` marks the order as paid, deletes the cart, and sends the user to `/orders`.

```
Browser  →  Server Actions / API routes  →  Prisma (Postgres)
                                      ↘  Supabase Storage (images)
                                      ↘  Stripe (checkout)
Clerk handles identity; middleware gates protected and admin routes.
```

---

## Getting started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) application
- A [Supabase](https://supabase.com) project (Postgres + Storage)
- A [Stripe](https://stripe.com) account in test mode

### 1. Clone and install

```bash
git clone https://github.com/<sofia-chiodi>/swift-store.git
cd swift-store
npm install
```

### 2. Environment variables

Create a `.env` file in the project root (and `.env.local` for Clerk keys if you prefer to keep them separate):

```bash
# Postgres (Supabase)
# DATABASE_URL = pooled connection (port 6543, used by the app)
# DIRECT_URL   = direct connection (port 5432, used by Prisma migrations)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"

# Admin (Clerk user ID of the account that can access /admin)
ADMIN_USER_ID=user_xxxxxxxxxxxxxxxxxxxxxxxx

# Supabase Storage
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_KEY=<supabase-service-role-key>

# Public site URL (share buttons, sitemap, robots)
NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

```bash
# .env.local — Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. Supabase Storage

In the Supabase dashboard, create a **public** storage bucket named `swift-store`. Product images are uploaded there.

If your Supabase project hostname is different from the one already listed in `next.config.mjs`, add it under `images.remotePatterns` so Next.js Image can load the files.

### 4. Database

```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

`db push` applies the Prisma schema to your database. The seed script inserts sample furniture products from `prisma/products.json`.

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Using the app

| Action   | Notes                                                                                      |
| -------- | ------------------------------------------------------------------------------------------ |
| Browse   | Home and `/products` are public. Search from the navbar.                                   |
| Sign in  | Use the menu in the navbar (Clerk modal).                                                  |
| Admin    | Sign in with the user whose ID is `ADMIN_USER_ID`. The dashboard link appears in the menu. |
| Checkout | Stripe test mode. Card `4242 4242 4242 4242`, any future expiry, any CVC.                  |

---

## Scripts

| Command         | Description                                         |
| --------------- | --------------------------------------------------- |
| `npm run dev`   | Start the development server                        |
| `npm run build` | Generate the Prisma client and build for production |
| `npm start`     | Start the production server                         |
| `npm run lint`  | Run ESLint                                          |

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) via Husky and commitlint.

---

## Project structure

```
app/            Pages, layouts, API routes (App Router)
components/     UI, cart, product, review, navbar, and form components
prisma/         Schema, seed data
utils/          Server actions, Prisma client, Zod schemas, Supabase helpers
middleware.ts   Clerk route protection and admin gate
```
