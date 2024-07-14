import { authRouter } from "~/server/api/routers/auth";
import { recipeRouter } from "~/server/api/routers/recipe";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  recipe: recipeRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.recipe.all();
 *       ^? Recipe[]
 */
export const createCaller = createCallerFactory(appRouter);
