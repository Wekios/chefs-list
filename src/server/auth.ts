import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
// declare module "next-auth" {
// interface Session extends DefaultSession {
//   user: {
//     id: string;
//     // ...other properties
//     // role: UserRole;
//   } & DefaultSession["user"];
// }
// interface User {
//   // ...other properties
//   // role: UserRole;
// }
// }

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GoogleProvider, GithubProvider],
  adapter: PrismaAdapter(db),

  // authorized({ request, auth }) {
  //   const { pathname } = request.nextUrl;
  //   if (pathname === "/middleware-example") return !!auth;
  //   return true;
  // },
});
