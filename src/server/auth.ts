import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { decode, encode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { ZodError, z } from "zod";

import { db } from "~/server/db";
import { signInSchema } from "~/validation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  jwt: { decode, encode },
  providers: [
    GoogleProvider,
    GithubProvider,
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await db.user.findUnique({ where: { email: email } });

          if (!user || !user.password) throw new Error("User not found.");

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) throw new Error("Password does not match.");

          return user;
        } catch (error) {
          // Return `null` to indicate that the credentials are invalid
          if (error instanceof ZodError) {
            console.log("Zod validation failed");
            return null;
          }
          return null;
        }
      },
      credentials: { email: {}, password: {} },
    }),
  ],
  session: { strategy: "jwt" },
});
