"use client";

import { Box } from "@mui/joy";

import { closeSidebar } from "./sidebarUtils";

export function SidebarOverlay() {
  return (
    <Box
      className="Sidebar-overlay"
      onClick={closeSidebar}
      sx={{
        backgroundColor: "var(--joy-palette-background-backdrop)",
        height: "100vh",
        left: 0,
        opacity: "var(--SideNavigation-slideIn)",
        position: "fixed",
        top: 0,
        transform: {
          lg: "translateX(-100%)",
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
        },
        transition: "opacity 0.4s",
        width: "100vw",
        zIndex: 9998,
      }}
    />
  );
}
