import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            onboardingCompleted: user.onboardingCompleted,
            userType: user.userType,
            nickname: user.nickname,
          },
        };
      }

      return session;
    },
  },
};
