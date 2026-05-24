This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First, installs all the dependencies listed within package.json in the local node_modules folder. Run this script once after cloning the repositiry.

```bash
yarn install
```

Then, edit package.json and provide the IP address of your server or change:
```
"dev": "next dev -H yourServerIP",
```
to
```
"dev": "next dev",
```

Finally, run the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://yourServerIP:3000](http://yourServerIP:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Program Committee certificates

Separate module in `certificate/` (PDF template, fonts, server logic). Data: `data/committee.csv` and `data/edition.json` → `certificate`. Routes: `/certificates/bulk` (organizer UI) and `/api/certificates/bulk` (ZIP API).

1. `npm run dev`
2. Open [http://localhost:3000/certificates/bulk](http://localhost:3000/certificates/bulk)

### Environment variable: `CERTIFICATE_ADMIN_SECRET`

Password for bulk ZIP export. Optional locally; **required in production** (do not rely on the dev default).

| Where | How to set |
|-------|------------|
| **Local** | Create `.env.local` in the project root: `CERTIFICATE_ADMIN_SECRET=your-secret-here` (file is gitignored). Restart `npm run dev`. |
| **Netlify** | Site settings → Environment variables → add `CERTIFICATE_ADMIN_SECRET` with a strong value. Redeploy after changing it. |

If unset, the app uses the development default `lasd-dev-admin-secret` (see `certificate/auth.js`).

Generate a secret, for example:

```bash
openssl rand -hex 32
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

