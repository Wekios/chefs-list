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
  delete: protectedProcedure.input(recipeIdSchema).mutation(async ({ ctx, input }) => {
    await ctx.db.mealIngredient.deleteMany({ where: { recipeId: input.id } });
    return ctx.db.recipe.delete({ where: { id: input.id } });
  }),
  getAll: protectedProcedure.query(async ({ ctx }) =>
    ctx.db.recipe.findMany({ orderBy: { updatedAt: "desc" } }),
  ),
  getCount: protectedProcedure.query(async ({ ctx }) => ctx.db.recipe.count()),
  getOne: protectedProcedure.input(recipeIdSchema).query(async ({ ctx, input }) => {
    const recipe = await ctx.db.recipe.findUnique({
      include: {
        createdBy: { select: { image: true, name: true } },
        mealIngredient: { include: { ingredient: true } },
      },
      where: { id: input.id },
    });

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    return {
      ...recipe,
      createdBy: { image: recipe.createdBy.image, name: recipe.createdBy.name },
    };
  }),
});
