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

export async function Header() {
  const session = await auth();

  const user = session?.user;

  return (
    <Box
      component="header"
      className="Header"
      sx={{
        p: 2,
        gap: 2,
        bgcolor: "background.surface",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gridColumn: "1 / -1",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <Navigation />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Dropdown>
            <MenuButton
              variant="plain"
              size="sm"
              sx={{ maxWidth: "32px", maxHeight: "32px", borderRadius: "999px" }}
            >
              <Avatar
                src={user?.image || "/chef-avatar.png"}
                sx={{ maxWidth: "32px", maxHeight: "32px", backgroundColor: "white" }}
              />
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
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
      </Box>
    </Box>
  );
}
