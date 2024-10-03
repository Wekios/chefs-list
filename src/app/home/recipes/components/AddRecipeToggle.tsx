"use client";

import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { Button } from "@mui/joy";
import { Fragment, useState } from "react";

import { AddRecipeDialog } from "./AddRecipeDialog";

export function AddRecipeToggle() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)} size="sm" startDecorator={<CreateRoundedIcon />}>
        Add new
      </Button>
      {open && <AddRecipeDialog onOpen={setOpen} />}
    </Fragment>
  );
}
