import { MealType, IngredientUnit } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().min(1),
        description: z.string(),
        mealType: z.array(z.nativeEnum(MealType)),
        ingredients: z.array(
          z.object({
            name: z.string().min(1),
            quantity: z.number(),
            unit: z.nativeEnum(IngredientUnit),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // list all ingredients

      try {
        await ctx.db.recipe.create({
          data: {
            name: input.name,
            description: input.description,
            mealType: input.mealType,
            createdBy: { connect: { id: input.userId } },
            mealIngredient: {
              create: input.ingredients.map((ingredient) => ({
                quantity: ingredient.quantity,
                unit: ingredient.unit,
                ingredient: {
                  connect: { name: ingredient.name },
                },
              })),
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
      return true;
    }),
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),

  // getLatest: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
