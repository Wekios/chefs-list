"use client";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListSubheader,
  Typography,
} from "@mui/joy";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const URL_LIST = [
  {
    href: "/home",
    icon: <CalendarMonthIcon />,
    label: "Calendar",
  },
  {
    href: "/home/recipes",
    icon: <FoodBankIcon />,
    label: "Recipes",
  },
  // {
  //   href: "/home/list",
  //   icon: <ChecklistIcon />,
  //   label: "List",
  // },
] as const;

export function Navigation() {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: 0,
        overflow: "hidden auto",
      }}
    >
      <List
        size="sm"
        sx={{ "--List-nestedInsetStart": "30px", "--ListItem-radius": "4px", gap: 1 }}
      >
        <ListSubheader sx={{ fontWeight: "800", letterSpacing: "2px" }}>Browse</ListSubheader>
        {URL_LIST.map(({ href, icon, label }) => (
          <ListItem key={href}>
            <ListItemButton
              component={NextLink}
              href={href}
              role="menuitem"
              selected={pathname === href}
            >
              {icon}
              <ListItemContent>
                <Typography level="title-sm">{label}</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
