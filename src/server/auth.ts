import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { type DefaultSession } from "next-auth";
import { JWT, decode, encode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { ZodError } from "zod";

import { db } from "~/server/db";
import { signInSchema } from "~/validation";

declare module "next-auth/jwt" {
  interface JWT {
    /** OpenID ID Token */
    id?: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  jwt: { decode, encode },
  providers: [
    GoogleProvider,
    GithubProvider,
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await db.user.findUnique({ where: { email: email } });

          if (!user?.password) throw new Error("User not found.");

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) throw new Error("Password does not match.");

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            console.log("Zod validation failed");
            return null;
          }
          return null; // Return `null` to indicate that the credentials are invalid
        }
      },
      credentials: { email: {}, password: {} },
    }),
  ],
  session: { strategy: "jwt" },
});
