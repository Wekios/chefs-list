import { auth } from "@/auth";
import { SignOut } from "@/app/auth/components/Actions";
import {
  Box,
  Dropdown,
  MenuButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  ListDivider,
} from "@mui/joy";

import { Navigation } from "./Navigation";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { UserAvatar } from "./UserAvatar";

export async function Header() {
  const session = await auth();

  const user = session?.user;

  return (
    // <Box
    //  ugly hack put here for the time being because MUI doesn't work well with Server Components
    //   sx={{
    //     display: "flex",
    //     flexGrow: 1,
    //     justifyContent: "space-between",
    //   }}
    // >
    <>
      <Navigation />

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1.5 }}>
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{ maxWidth: "32px", maxHeight: "32px", borderRadius: "999px" }}
          >
            <UserAvatar user={session?.user} />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            <MenuItem>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar src={user?.image || "/chef-avatar.png"} sx={{ borderRadius: "50%" }} />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    {user?.name}
                  </Typography>
                  <Typography level="body-xs" textColor="text.tertiary">
                    {user?.email}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <HelpRoundedIcon />
              Help
            </MenuItem>
            <MenuItem>
              <SettingsRoundedIcon />
              Settings
            </MenuItem>
            <ListDivider />
            <SignOut startDecorator={<LogoutRoundedIcon />} fullWidth />
          </Menu>
        </Dropdown>
      </Box>
    </>
  );
}
