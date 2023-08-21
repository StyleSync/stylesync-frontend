# Setup

- [Initial setup](#initial-setup)
- [Start application](#start-application)
- [Prisma setup](#prisma-setup)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## <a name="initial-setup"></a> Initial setup

For deploy project locally, please follow the next guide:

1. **Clone project**

   ```bash
   $ git clone git@github.com:StyleSync/stylesync-frontend.git
   ```
2. **Enviroment setup**

   The project is using various technology and adheres the approach as simple as possible.

   Create `.env` file with all variables that are in `.env.exmaple` file.

3. **Install dependencies**

   ```bash
   $ yarn install
   ```

## <a name="start-application"></a> Start application

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## <a name="prisma setup"></a> Prisma setup 

To generate Prisma client, you can run the next command:

```bash
prisma generate
```

This will add models to the `@prisma/client` package and generate Prisma Client to `node_modules/@prisma/client`,
also it will generate the corresponding TypeScript types.

To learn more about how Prisma generate client, you can check next link:

- [Generating Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client) - learn about generating functionallity for Prisma.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
