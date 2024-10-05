import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Avatar, Button, Dropdown, ListDivider, Menu, MenuButton, MenuItem } from "@mui/joy";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import { UserAvatar } from "~/components/UserAvatar";
import { auth, signOut } from "~/server/auth";

const textEllipsisStyles = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

export async function User() {
  const session = await auth();

  return (
    <Dropdown>
      <MenuButton
        size="sm"
        sx={{ gap: 1, justifyContent: "flex-start", textAlign: "left" }}
        variant="plain"
      >
        <UserAvatar size="sm" src={session?.user?.image} />
        <Box sx={{ overflow: "hidden" }}>
          <Typography level="title-sm" sx={textEllipsisStyles}>
            {session?.user?.name}
          </Typography>
          <Typography level="body-xs" sx={textEllipsisStyles}>
            {session?.user?.email}
          </Typography>
        </Box>
      </MenuButton>
      <Menu
        placement="bottom-end"
        size="sm"
        sx={{ "--ListItem-radius": "var(--joy-radius-sm)", gap: 1, p: 1, zIndex: "99999" }}
      >
        <MenuItem>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Avatar
              src={session?.user?.image ?? "/chef-avatar.png"}
              sx={{ backgroundColor: "white", borderRadius: "50%" }}
            />
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
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button fullWidth startDecorator={<LogoutRoundedIcon />} type="submit" variant="plain">
            Sign out
          </Button>
        </form>
      </Menu>
    </Dropdown>
  );
}
