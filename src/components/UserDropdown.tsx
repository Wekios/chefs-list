import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import { Avatar, Dropdown, ListDivider, Menu, MenuButton, MenuItem } from "@mui/joy";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { auth } from "@/auth";
import { UserAvatar } from "./UserAvatar";

export async function UserDropdown() {
  const session = await auth();

  return (
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar src={session?.user?.image || "/chef-avatar.png"} sx={{ borderRadius: "50%" }} />
            <Box sx={{ ml: 1.5 }}>
              <Typography level="title-sm" textColor="text.primary">
                {session?.user?.name}
              </Typography>
              <Typography level="body-xs" textColor="text.tertiary">
                {session?.user?.email}
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
        <MenuItem>
          <LogoutRoundedIcon />
          Log out
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
