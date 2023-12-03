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
      href: "/calendar",
    },
    {
      label: "Recipes",
      href: "/recipes",
    },
    {
      label: "List",
      href: "/list",
    },
  ];

  return links.map(({ label, href }) => {
    const isActive = pathname === href;

    return (
      <Button
        key={label}
        variant="plain"
        color="neutral"
        component={NextLink}
        href={href}
        size="sm"
        sx={{ alignSelf: "center" }}
        aria-pressed={isActive}
      >
        {label}
      </Button>
    );
  });
};

export function Navigation() {
  const pathname = usePathname();

  // aria-pressed={pathname === "/joy-ui/getting-started/templates/email/"}

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
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
