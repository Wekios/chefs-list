"use client";

import {
  Box,
  CircularProgress,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Skeleton,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import React, { Fragment } from "react";

import { api } from "~/trpc/react";
import { formatDate } from "~/utils/formatting";

const createSkeletons = (count: number) => {
  const skeletons = [];
  for (let i = 0; i < count; i++) {
    skeletons.push(
      <Fragment key={i}>
        <Box sx={{ display: "flex", gap: 2, m: "auto", padding: 2 }}>
          <Skeleton height={40} variant="circular" width={40} />
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1", gap: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton height="0.75em" variant="rectangular" width={100} />
              <Skeleton height="0.75em" variant="rectangular" width={80} />
            </Box>
            <Skeleton height="0.9em" variant="rectangular" width={170} />
            <Skeleton height="0.75em" variant="rectangular" width={140} />
          </Box>
        </Box>
        <ListDivider sx={{ m: 0 }} />
      </Fragment>,
    );
  }
  return skeletons;
};

export function RecipeList({ count }: { count: number }) {
  const selectedRecipeId = Number(useParams<{ id?: string }>().id);

  const { data: recipes, isFetching, status } = api.recipe.getAll.useQuery();

  if (status === "pending") {
    return createSkeletons(count);
  } else if (status === "error") {
    return <div>Something went wrong</div>;
  }

  return (
    <Box sx={{ position: "relative" }}>
      {isFetching && (
        <CircularProgress
          sx={{
            left: "50%",
            position: "absolute",
            top: "50%",
            transform: "translate3d(-50%, -50%, 0)",
          }}
          variant="soft"
        />
      )}

      <List sx={{ opacity: isFetching ? "0.5" : "1" }}>
        {recipes.map((recipe) => (
          <React.Fragment key={recipe.id}>
            <ListItem>
              <ListItemButton
                component={NextLink}
                href={{ pathname: `/home/recipes/${recipe.id}` }}
                // href={`/home/recipes/${recipe.id}`}
                {...(selectedRecipeId === recipe.id && {
                  color: "neutral",
                  selected: true,
                })}
                sx={{ p: 2 }}
              >
                <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
                  <Image alt="" height={40} src="/fries.png" width={40} />
                </ListItemDecorator>
                <Box sx={{ pl: 2, width: "100%" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Box sx={{ alignItems: "center", display: "flex", gap: 0.5 }}>
                      <Typography level="body-xs">{recipe.name}</Typography>
                      <Box
                        sx={{
                          borderRadius: "99px",
                          height: "8px",
                          width: "8px",
                          // bgcolor: recipe.color,
                        }}
                      />
                    </Box>
                    <Typography level="body-xs" textColor="text.tertiary">
                      {formatDate(recipe.createdAt)}
                    </Typography>
                  </Box>
                  <div>
                    <Typography level="title-sm" sx={{ mb: 0.5 }}>
                      {recipe.name}
                    </Typography>
                    <Typography
                      level="body-sm"
                      sx={{
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "1",
                        display: "-webkit-box",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {recipe.description}
                    </Typography>
                  </div>
                </Box>
              </ListItemButton>
            </ListItem>
            <ListDivider sx={{ m: 0 }} />
          </React.Fragment>
        ))}
        <ListDivider sx={{ m: 0 }} />
      </List>
    </Box>
  );
}
