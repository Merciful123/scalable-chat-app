import { LOGIN_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";
import { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!account) return false;

        const oauthId =
          account.providerAccountId ??
          account.id ??
          user?.id ??
          null;

        const payload = {
          email: user?.email,
          name: user?.name,
          oauth_id: oauthId,
          provider: account.provider,
          image: user?.image,
        };

        const { data } = await axios.post(LOGIN_URL, payload);

        user.id = data.user.id?.toString();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        user.token = data.user.token;

        return true;
      } catch (error) {
        return false; // NextAuth will redirect to pages.error
      }
    },

    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as CustomUser;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};
