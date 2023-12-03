import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { auth } from "@/auth";

export async function UserDropdown() {
  const session = await auth();

  const user = session?.user;

  return (
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
        <MenuItem>
          <LogoutRoundedIcon />
          Log out
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
