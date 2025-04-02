import { auth } from "@/config/firebaseClientConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DefaultSession, NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    sub: string;
    exp: number;
  }
}

const MAX_AGE = 60 * 60 * 2; // 2 days

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const isSignup = req.body?.isSignup as boolean;
        try {
          if (isSignup) {
            const userCredentials = await createUserWithEmailAndPassword(
              auth,
              credentials!.email,
              credentials!.password
            );
            return {
              id: userCredentials.user.uid,
              email: userCredentials.user.email,
            };
          } else {
            const userCredentials = await signInWithEmailAndPassword(
              auth,
              credentials!.email,
              credentials!.password
            );
            return {
              id: userCredentials.user.uid,
              email: userCredentials.user.email,
            };
          }
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: MAX_AGE },
  callbacks: {
    async session({ session, token, user }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      session.expires = new Date((token.exp as number) * 1000).toISOString();
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.sub = user.id;
        token.exp = Math.floor(Date.now() / 1000) + MAX_AGE;
      } else if (account && profile) {
        token.sub = account.providerAccountId;
        token.email = profile.email;
        token.name = profile.name;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
