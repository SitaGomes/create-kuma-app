// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';

// Example: Extend the built-in types for the session and user
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession`, and in the `session` callback
   */
  interface Session {
    user?: {
      /** The user's access token */
      accessToken?: string;
      /** The user's DB id */
      id?: string;
      /** The user's username */
      name?: string;
      /** The user's email */
      email?: string;
      /** The user's organization id */
      orgId?: string;

      username?: string;

      level?: string;

      // add any other fields you want to include on session.user
    } & DefaultSession['user'];
  }

  /**
   * The shape of the user object returned by OAuth providers and credentials provider
   */
  interface User extends DefaultUser {
    /** Access token returned on login */
    accessToken?: string;
    /** DB id of the user (instead of sub from OAuth) */
    id?: string;
  }

  /**
   * The shape of the JWT object returned by the `jwt` callback
   */
  interface JWT {
    accessToken?: string;
    id?: string;
    // add any other fields you want to include in the JWT
  }
}
