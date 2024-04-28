import NextAuth from 'next-auth';
import { authOptions } from '@/modules/auth/constants/auth-server.constants';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
