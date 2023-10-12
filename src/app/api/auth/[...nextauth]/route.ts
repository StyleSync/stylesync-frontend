import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const prisma = new PrismaClient();

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
