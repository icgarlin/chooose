This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install packages and run the development server:

```bash

yarn install 

yarn dev

```

## Architecture / Library Choices
For the UI I chose to use tailwindcss because of both prior experience and the ability easily create a simple 
& consistent style.  The tailwind ui also facilitates the creation of a mobile user interface. 

Rather than loading the data in on the frontend, I chose to simulate API calls by making use of NextJS's serverless architecture.  Enabling a separation of concerns and allowing for significantly less code bloat on the frontend. 



### Assumptions / Application Flow

  Data Example:
    Customer.json:
  - Partnership: "Chooose SAF Demo" (partnership ID: 682fa8c19340de8ea5338e8a)
  - Customer: "Kanu's Tea Shop"
    - Organization that does business travel
    - Has employees who fly
    - Tracks their flight emissions
    - Can purchase SAF attributes


  The Flow:

  1. Acme Airlines (Partnership) → Signs up with Chooose
  2. Delta Corp (Customer) → A company that flies with Acme Airlines regularly
  3. Delta Corp's employees → Take business flights
  4. Delta Corp → Uses the emissions dashboard to:
    - See: "Your organization emitted 11,366 tCO₂e from 1,251 flights"
    - Purchase SAF attributes to offset those emissions
    - Get certificates for sustainability reporting

    Chooose Platform
    │
    └─ Partnership: "Acme Airlines"
        │
        └─ Customer: "Delta Corp" (a business that flies with Acme)
            │
            ├─ Employees/Travelers who take flights
            ├─ Tracks emissions from their business travel
            └─ Purchases SAF attributes to offset their footprint

  So in the context of "Kanu's Tea Shop" (from Customer.json):
  - They're a business customer of the partnership
  - They track their company's flight emissions
  - They purchase SAF attributes to reduce their carbon footprint
  - They use it for ESG/sustainability reporting



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
