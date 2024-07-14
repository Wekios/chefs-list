import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { signUpSchema } from "~/validation";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    try {
      await ctx.db.user.create({ data: { email: input.email, password: hashedPassword } });
      return { email: input.email, password: input.password };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Email already exists" });
        }
      }
      throw error;
    }
  }),
});
