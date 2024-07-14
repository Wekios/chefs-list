import type { User } from "next-auth";

import { Avatar } from "@mui/joy";

export function UserAvatar({ user }: { user?: User }) {
  return (
    <Avatar
      slotProps={{ img: { referrerPolicy: "no-referrer" } }}
      src={user?.image || "/chef-avatar.png"}
      sx={{ backgroundColor: "white", maxHeight: "32px", maxWidth: "32px" }}
    />
  );
}
