import { LOGIN_URL } from "@/lib/apiEndPoints";
import axios from "axios";
import {  Account, AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

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

// Validate environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error("Missing Google OAuth credentials");
  console.log("GOOGLE_CLIENT_ID:", GOOGLE_CLIENT_ID ? "Present" : "Missing");
  console.log("GOOGLE_CLIENT_SECRET:", GOOGLE_CLIENT_SECRET ? "Present" : "Missing");
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }: {
      user: CustomUser;
      account: Account | null;
    }) {
      try {
        console.log("SignIn callback triggered");
        
        if (!account) {
          console.error("No account object received");
          return false;
        }

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

        console.log("Sending payload to backend:", { ...payload, oauth_id: "***" });

        const { data } = await axios.post(LOGIN_URL, payload);
        
        user.id = data?.user?.id?.toString();
        user.token = data?.user?.token;
        
        console.log("Backend authentication successful");
        return true;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Backend authentication failed:", {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
        } else {
          console.error("Unexpected error during signIn:", error);
        }
        return false;
      }
    },
    async session({ session, token, user }:{
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
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
      //@ts-expect-error avoiding ts error
      clientId: GOOGLE_CLIENT_ID,
      //@ts-expect-error avoiding ts error
      clientSecret: GOOGLE_CLIENT_SECRET,
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