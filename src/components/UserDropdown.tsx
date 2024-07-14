import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Avatar, Dropdown, ListDivider, Menu, MenuButton, MenuItem } from "@mui/joy";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import { SignOut } from "~/app/auth/components/Actions";
import { auth } from "~/server/auth";

import { UserAvatar } from "./UserAvatar";

export async function UserDropdown() {
  const session = await auth();

  return (
    <Dropdown>
      <MenuButton
        size="sm"
        sx={{ borderRadius: "999px", maxHeight: "32px", maxWidth: "32px" }}
        variant="plain"
      >
        <UserAvatar user={session?.user} />
      </MenuButton>
      <Menu
        placement="bottom-end"
        size="sm"
        sx={{
          "--ListItem-radius": "var(--joy-radius-sm)",
          gap: 1,
          p: 1,
          zIndex: "99999",
        }}
      >
        <MenuItem>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
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
        <SignOut fullWidth startDecorator={<LogoutRoundedIcon />} />
      </Menu>
    </Dropdown>
  );
}
