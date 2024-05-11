"use client";
import { Stack, IconButton, Button } from "@mui/joy";
import NextLink from "next/link";

import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { usePathname } from "next/navigation";

const renderLinks = (pathname: string) => {
  const links = [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Calendar",
      href: "/home/calendar",
    },
    {
      label: "Recipes",
      href: "/home/recipes",
    },
    {
      label: "List",
      href: "/home/list",
    },
  ];

  return links.map(({ label, href }) => {
    const isActive = pathname === href;

    return (
      <Button
        key={label}
        size="sm"
        href={href}
        variant="plain"
        color="neutral"
        component={NextLink}
        aria-pressed={isActive}
        sx={{ alignSelf: "center" }}
      >
        {label}
      </Button>
    );
  });
};

export function Navigation() {
  const pathname = usePathname();

  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ display: { xs: "none", sm: "flex" } }}
    >
      <IconButton
        size="md"
        variant="outlined"
        color="neutral"
        sx={{ display: { xs: "none", sm: "inline-flex" }, borderRadius: "50%" }}
      >
        <LanguageRoundedIcon />
      </IconButton>
      {renderLinks(pathname)}
    </Stack>
  );
}
