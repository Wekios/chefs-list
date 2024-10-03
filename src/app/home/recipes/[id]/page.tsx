"use client";

import AddIcon from "@mui/icons-material/Add";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/navigation";

import { UserAvatar } from "~/components/UserAvatar";
import { api } from "~/trpc/react";
import { formatDate } from "~/utils/formatting";

export default function RecipeIdPage({ params }: { params: { id: string } }) {
  const utils = api.useUtils();
  const recipe = api.recipe.getOne.useQuery({ id: Number(params.id) });
  const router = useRouter();
  const deleteRecipe = api.recipe.delete.useMutation({
    onSuccess: () => {
      utils.recipe.getAll.invalidate();
      router.push("/home/recipes");
      router.refresh();
    },
  });

  const handleDelete = () => {
    deleteRecipe.mutate({ id: Number(params.id) });
  };

  if (recipe.status === "pending") {
    return <div>Loading...</div>;
  } else if (recipe.status === "error") {
    return <div>Something went wrong</div>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Sheet sx={{ borderRadius: "sm", mb: 3, p: 2 }} variant="outlined">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <UserAvatar src={recipe.data.createdBy.image} />
            <Box sx={{ ml: 2 }}>
              <Typography level="title-sm" mb={0.5} textColor="text.primary">
                {recipe.data.createdBy.name}
              </Typography>
              <Typography level="body-xs" textColor="text.tertiary">
                {formatDate(recipe.data.createdAt)}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5, height: "32px" }}>
            <Button
              color="primary"
              onClick={() => alert("to do")}
              size="sm"
              startDecorator={<AddIcon />}
              variant="plain"
            >
              Add to meal plan
            </Button>

            <Button
              color="danger"
              onClick={handleDelete}
              size="sm"
              startDecorator={<DeleteRoundedIcon />}
              variant="plain"
            >
              Delete
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Box sx={{ alignItems: "start", display: "flex", flexDirection: "column", py: 2 }}>
          <Typography
            endDecorator={recipe.data.mealType.map((mealType) => (
              <Chip color="warning" component="span" key={mealType} size="sm" variant="outlined">
                {mealType}
              </Chip>
            ))}
            level="title-lg"
            textColor="text.primary"
          >
            {recipe.data.name}
          </Typography>
        </Box>
        <Divider />
        <Box my={2}>
          <Typography level="title-sm" mb={2} mt={2}>
            Ingredients
          </Typography>

          {recipe.data.mealIngredient.map(({ ingredient, quantity, unit }) => (
            <Box key={ingredient.name} sx={{ display: "flex", gap: 1 }}>
              <Typography fontWeight={600} level="body-sm">
                {ingredient.name}:
              </Typography>
              <Typography level="body-sm">
                {quantity} {unit}
              </Typography>
            </Box>
          ))}
        </Box>
        <Divider />
        {recipe.data.description && (
          <Typography level="body-sm" mb={2} mt={2}>
            {recipe.data.description}
          </Typography>
        )}
        <Divider />
        <Typography level="title-sm" mb={2} mt={2}>
          Attachments
        </Typography>
      </Sheet>
    </Box>
  );
}
