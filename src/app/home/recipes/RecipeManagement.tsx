import { Fragment } from "react";
import { Box, Typography, Button } from "@mui/joy";
import { RecipeList } from "./RecipeList";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import { FocusTrap } from "@mui/base/FocusTrap";
import AddRecipe from "./AddRecipe";

export function RecipeManagement() {
  return (
    <Fragment>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ alignItems: "center", gap: 1 }}>
          <Typography level="title-lg" textColor="text.secondary">
            My inbox
          </Typography>
          <Typography level="title-sm" textColor="text.tertiary">
            5 emails
          </Typography>
        </Box>
        <AddRecipe />
        {/* <FocusTrap open={false} disableAutoFocus disableEnforceFocus> */}
        {/* <div>write email</div> */}
        {/* <WriteEmail open={open} onClose={() => setOpen(false)} /> */}
        {/* </FocusTrap> */}
      </Box>
      <RecipeList />
    </Fragment>
  );
}
