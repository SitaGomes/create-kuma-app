import { loginAsync } from '@/lib';
import { User } from '@/types';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.email === undefined ||
          credentials?.password === undefined
        ) {
          return null;
        }

        try {
          const res = await loginAsync(credentials.email, credentials.password);

          if (res.status !== 200) {
            return null;
          }

          const data = res;

          if (data?.token) {
            return {
              accessToken: data.token,
              username: data.user.username,
              email: data.user.email,
              orgId: data.user.orgId,
              level: data.user.level,
              id: data.user.id,
            };
          }

          return null;
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as User;
        session.user.accessToken = token.accessToken as string;
      }

      return session;
    },
  },
};
