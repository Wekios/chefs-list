import { Box, Sheet, Typography } from "@mui/joy";

import { api } from "~/trpc/server";

import { AddRecipeToggle } from "./AddRecipeToggle";
import { RecipeList } from "./RecipeList";

export async function RecipeManagement() {
  const recipeCount = await api.recipe.getCount();

  return (
    <Sheet
      sx={{
        borderRight: "1px solid var(--joy-palette-divider)",
        height: "calc(100dvh - var(--Header-height))",
        overflowY: "auto",
      }}
    >
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", p: 2 }}>
        <Box>
          <Typography level="title-lg" textColor="text.secondary">
            My recipes
          </Typography>
          <Typography level="title-sm" textColor="text.tertiary">
            {recipeCount} {recipeCount === 1 ? "recipe" : "recipes"}
          </Typography>
        </Box>
        <AddRecipeToggle />
      </Box>
      <RecipeList count={recipeCount} />
    </Sheet>
  );
}
