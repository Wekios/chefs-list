import { IngredientUnit, MealType } from "@prisma/client";
import { z } from "zod";

export type SignUpSchema = z.infer<typeof signUpSchema>;
export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(20),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type AddRecipeSchema = z.infer<typeof addRecipeSchema>;
export const addRecipeSchema = z.object({
  description: z.string(),
  ingredients: z.array(
    z.object({
      name: z.string().min(1),
      quantity: z.number(),
      unit: z.nativeEnum(IngredientUnit),
    }),
  ),
  mealType: z.array(z.nativeEnum(MealType)),
  name: z.string().min(1),
});
