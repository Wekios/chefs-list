"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { GlobalStyles, IconButton, Sheet } from "@mui/joy";

import { toggleSidebar } from "./sidebarUtils";

export function Header() {
  return (
    <Sheet
      sx={{
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "sm",
        display: { md: "none", xs: "flex" },
        gap: 1,
        height: "var(--Header-height)",
        justifyContent: "space-between",
        p: 2,
        position: "fixed",
        top: 0,
        width: "100vw",
        zIndex: 9995,
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Header-height": "52px",
            [theme.breakpoints.up("md")]: {
              "--Header-height": "0px",
            },
          },
        })}
      />
      <IconButton color="neutral" onClick={toggleSidebar} size="sm" variant="outlined">
        <MenuIcon />
      </IconButton>
    </Sheet>
  );
}
