"use client";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { Button, IconButton, Stack } from "@mui/joy";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const renderLinks = (pathname: string) => {
  const links = [
    {
      href: "/home",
      label: "Home",
    },
    {
      href: "/home/calendar",
      label: "Calendar",
    },
    {
      href: "/home/recipes",
      label: "Recipes",
    },
    {
      href: "/home/list",
      label: "List",
    },
  ];

  return links.map(({ href, label }) => {
    const isActive = pathname === href;

    return (
      <Button
        aria-pressed={isActive}
        color="neutral"
        component={NextLink}
        href={href}
        key={label}
        size="sm"
        sx={{ alignSelf: "center" }}
        variant="plain"
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
      alignItems="center"
      direction="row"
      justifyContent="center"
      spacing={1}
      sx={{ display: { sm: "flex", xs: "none" } }}
    >
      <IconButton
        color="neutral"
        size="md"
        sx={{ borderRadius: "50%", display: { sm: "inline-flex", xs: "none" } }}
        variant="outlined"
      >
        <LanguageRoundedIcon />
      </IconButton>
      {renderLinks(pathname)}
    </Stack>
  );
}
