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
import { useParams, usePathname } from "next/navigation";
import React, { Fragment } from "react";

import { api } from "~/trpc/react";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function RecipeList({ count }: { count: number }) {
  const selectedRecipeId = Number(useParams<{ id?: string }>().id);

  const { data: recipes, isFetching, status } = api.recipe.getAll.useQuery();

  if (status === "pending") {
    return Array(count)
      .fill(0)
      .map((_, idx) => (
        <Fragment key={idx}>
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
        </Fragment>
      ));
  } else if (status === "error") {
    return <div>aaaa</div>;
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
        {recipes.map((recipe, idx) => (
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
                  {/* <Avatar
                    alt=""
                    // srcSet={`https://i.pravatar.cc/80?img=${idx}`}
                    src={}
                  /> */}
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
        {/* {data.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemButton
              component={NextLink}
              href={`/home/recipes/${item.id}`}
              {...(selectedRecipeId === Number(item.id) && {
                selected: true,
                color: "neutral",
              })}
              sx={{ p: 2 }}
            >
              <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
                <Avatar alt="" srcSet={item.avatar2x} src={item.avatar} />
              </ListItemDecorator>
              <Box sx={{ pl: 2, width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography level="body-xs">{item.name}</Typography>
                    <Box
                      sx={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "99px",
                        bgcolor: item.color,
                      }}
                    />
                  </Box>
                  <Typography level="body-xs" textColor="text.tertiary">
                    {item.date}
                  </Typography>
                </Box>
                <div>
                  <Typography level="title-sm" sx={{ mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography level="body-sm">{item.body}</Typography>
                </div>
              </Box>
            </ListItemButton>
          </ListItem>
          <ListDivider sx={{ m: 0 }} />
        </React.Fragment>
      ))} */}
      </List>
    </Box>
  );
}
