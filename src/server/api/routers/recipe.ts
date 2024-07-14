import { addRecipeSchema } from "~/app/validation";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  create: protectedProcedure.input(addRecipeSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.recipe.create({
      data: {
        createdBy: { connect: { id: ctx.session.user.id } },
        description: input.description,
        mealIngredient: {
          create: input.ingredients.map((ingredient) => ({
            ingredient: {
              connect: { name: ingredient.name },
            },
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          })),
        },
        mealType: input.mealType,
        name: input.name,
      },
    });
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.recipe.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }),
  getCount: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.recipe.count();
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
