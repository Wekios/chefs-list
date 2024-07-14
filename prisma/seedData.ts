import { Ingredient, MealIngredient, MealType, Recipe } from "@prisma/client";

let ingredientId = 0;

export const generateIngredient = (
  ingredient: Pick<Ingredient, "category" | "name">,
): Ingredient => ({
  createdAt: new Date(),
  id: ++ingredientId,
  updatedAt: new Date(),
  ...ingredient,
});

let mealIngredientId = 0;

export const generateMealIngredient = (
  recipeId: Recipe["id"],
  ingredientId: Ingredient["id"],
  mealIngredient: Pick<MealIngredient, "quantity" | "unit">,
): MealIngredient => ({
  id: ++mealIngredientId,
  ingredientId,
  recipeId,
  ...mealIngredient,
});

export const generateRecipe = (
  recipe: Pick<Recipe, "id" | "mealType" | "name">,
  mealIngredients: MealIngredient[],
): { mealIngredient: MealIngredient[] } & Recipe => ({
  createdAt: new Date(),
  createdById: "blue",
  description: "",
  updatedAt: new Date(),
  ...recipe,
  mealIngredient: mealIngredients,
});

export const Avocado = generateIngredient({ category: "FRUIT", name: "Avocado" });
export const PresidentCheese = generateIngredient({
  category: "DAIRY",
  name: "President cheese 5.5%",
});
export const ChickenFilet = generateIngredient({ category: "MEAT", name: "Chicken Filet" });
export const MixedLettuceGreen = generateIngredient({
  category: "VEGETABLE",
  name: "Mixed Lettuce Green",
});
export const Tomato = generateIngredient({ category: "VEGETABLE", name: "Tomato" });
export const OliveOil = generateIngredient({ category: "OIL", name: "Olive oil" });
export const Lemon = generateIngredient({ category: "FRUIT", name: "Lemon" });
export const Mustard = generateIngredient({ category: "SPICE", name: "Mustard" });
export const Salt = generateIngredient({ category: "SPICE", name: "Salt" });
export const LemonJuice = generateIngredient({ category: "SPICE", name: "Lemon juice" });

export const ingredientList = [
  Avocado,
  PresidentCheese,
  ChickenFilet,
  MixedLettuceGreen,
  Tomato,
  OliveOil,
  Lemon,
  Mustard,
  Salt,
  LemonJuice,
];

const CheeseAvocadoSandwich = generateRecipe(
  { id: 1, mealType: [MealType.BREAKFAST], name: "Cheese Avocado Sandwich" },
  [
    generateMealIngredient(1, Avocado.id, { quantity: 1, unit: "PIECE" }),
    generateMealIngredient(1, PresidentCheese.id, { quantity: 50, unit: "GRAM" }),
  ],
);

const CaesarsSalad = generateRecipe(
  { id: 2, mealType: [MealType.BREAKFAST], name: "Caesars Salad" },
  [
    generateMealIngredient(2, ChickenFilet.id, { quantity: 220, unit: "GRAM" }),
    generateMealIngredient(2, MixedLettuceGreen.id, { quantity: 1, unit: "PIECE" }),
    generateMealIngredient(2, Tomato.id, { quantity: 1, unit: "PIECE" }),
    generateMealIngredient(2, OliveOil.id, { quantity: 2, unit: "TABLESPOON" }),
    generateMealIngredient(2, LemonJuice.id, { quantity: 2, unit: "TABLESPOON" }),
    generateMealIngredient(2, Mustard.id, { quantity: 2, unit: "TABLESPOON" }),
    generateMealIngredient(2, Salt.id, { quantity: 2, unit: "TABLESPOON" }),
  ],
);

export const recipeList = [CheeseAvocadoSandwich, CaesarsSalad];
