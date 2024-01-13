"use client";

import { Box, Sheet, Typography, styled } from "@mui/joy";
import { Fragment } from "react";

// const Item = styled(Sheet)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
//   ...theme.typography["body-sm"],
//   padding: theme.spacing(1),
//   textAlign: "center",
//   borderRadius: 4,
//   color: theme.vars.palette.text.secondary,
// }));

const MealPlaceholder = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
  border: `2px dashed ${theme.palette.divider}`,
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
}));

const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function Calendar() {
  return (
    <Box p={2} gridColumn="2/-1">
      <Sheet
        variant="outlined"
        sx={{
          p: 1,
          gap: 2,
          display: "grid",
          gridTemplateRows: "50px repeat(7, minmax(100px, 1fr))",
          borderRadius: "sm",
        }}
      >
        {dayLabels.map((day, index) => {
          const dayContent = (
            <Box
              key={day}
              display="grid"
              gridTemplateColumns="150px repeat(4, minmax(200px, 1fr))"
              gap={2}
            >
              <Box display="flex" alignItems="center" pl={3}>
                <Typography component="h3" level="title-md">
                  {day}
                </Typography>
              </Box>
              <MealPlaceholder>Meal Missing</MealPlaceholder>
              <MealPlaceholder>Meal Missing</MealPlaceholder>
              <MealPlaceholder>Meal Missing</MealPlaceholder>
              <MealPlaceholder>Meal Missing</MealPlaceholder>
            </Box>
          );

          if (index === 0) {
            return (
              <Fragment key="blank">
                <Box
                  key="meal-type"
                  display="grid"
                  gridTemplateColumns="150px repeat(4, minmax(200px, 1fr))"
                  justifyItems="center"
                  alignItems="center"
                >
                  <Box />
                  <Typography component="h3" level="title-md">
                    Breakfast
                  </Typography>
                  <Typography component="h3" level="title-md">
                    Lunch
                  </Typography>
                  <Typography component="h3" level="title-md">
                    Dinner
                  </Typography>
                  <Typography component="h3" level="title-md">
                    Snack
                  </Typography>
                </Box>
                {dayContent}
              </Fragment>
            );
          }

          return dayContent;
        })}
      </Sheet>
    </Box>
  );
}
