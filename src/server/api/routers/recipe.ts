import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { addRecipeSchema, recipeIdSchema } from "~/validation";

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
  getAll: protectedProcedure.query(async ({ ctx }) =>
    ctx.db.recipe.findMany({ orderBy: { updatedAt: "desc" } }),
  ),
  getCount: protectedProcedure.query(async ({ ctx }) => ctx.db.recipe.count()),
  getOne: protectedProcedure.input(recipeIdSchema).query(async ({ ctx, input }) => {
    const recipe = await ctx.db.recipe.findUnique({
      include: { createdBy: { select: { name: true } } },
      where: { createdBy: { id: ctx.session.user.id }, id: input.id },
    });

    // TODO: figure out how to get session.user.id with OAuth
    console.log("ctx.session.user.id", ctx.session.user);
    console.log(recipe);

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    return { ...recipe, createdBy: recipe.createdBy.name };
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
