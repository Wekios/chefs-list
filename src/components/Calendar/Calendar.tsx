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
  alignItems: "center",
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(1),
  textAlign: "center",
}));

const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function Calendar() {
  return (
    <Box sx={{ height: "100%", p: 2 }}>
      <Sheet
        sx={{
          borderRadius: "sm",
          display: "grid",
          gap: 2,
          gridTemplateRows: "50px repeat(7, minmax(100px, 1fr))",
          height: "100%",
          p: 1,
        }}
        variant="outlined"
      >
        {dayLabels.map((day, index) => {
          const dayContent = (
            <Box
              display="grid"
              gap={2}
              gridTemplateColumns="150px repeat(4, minmax(200px, 1fr))"
              key={day}
            >
              <Box alignItems="center" display="flex" pl={3}>
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
                  alignItems="center"
                  display="grid"
                  gridTemplateColumns="150px repeat(4, minmax(200px, 1fr))"
                  justifyItems="center"
                  key="meal-type"
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
