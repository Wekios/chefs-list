import { Box, Divider, GlobalStyles, Sheet } from "@mui/joy";
import React from "react";

import { Logo } from "~/components/Logo";
import { Navigation } from "~/components/Navigation";

import { SidebarOverlay } from "./SidebarOverlay";
import { User } from "./User";

export function Sidebar() {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        borderRight: "1px solid var(--joy-palette-divider)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        gap: 2,
        height: "100dvh",
        p: 2,
        position: { md: "sticky", xs: "fixed" },
        top: 0,
        transform: {
          md: "none",
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
        },
        transition: "transform 0.4s, width 0.4s",
        width: "var(--Sidebar-width)",
      }}
    >
      <GlobalStyles styles={{ ":root": { "--Sidebar-width": "210px" } }} />
      <SidebarOverlay />
      <Box>
        <Logo />
        {/* <IconButton color="primary" size="sm" variant="soft">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">Acme Co.</Typography> */}
        {/* <ColorSchemeToggle sx={{ ml: "auto" }} /> */}
      </Box>

      <Navigation />

      {/*
        This could be cool to reuse if necessary
        <Card color="warning" invertedColors size="sm" sx={{ boxShadow: "none" }} variant="soft">
          <Stack alignItems="center" direction="row" justifyContent="space-between">
            <Typography level="title-sm">Used space</Typography>
            <IconButton size="sm">
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Typography level="body-xs">
            Your team has used 80% of your available space. Need more?
          </Typography>
          <LinearProgress determinate sx={{ my: 1 }} value={80} variant="outlined" />
          <Button size="sm" variant="solid">
            Upgrade plan
          </Button>
        </Card> */}
      <Divider />
      <User />
    </Sheet>
  );
}
