import { Avatar } from "@mui/joy";
import type { User } from "next-auth/types";

export function UserAvatar({ user }: { user?: User }) {
  return (
    <Avatar
      src={user?.image || "/chef-avatar.png"}
      slotProps={{ img: { referrerPolicy: "no-referrer" } }}
      sx={{ maxWidth: "32px", maxHeight: "32px", backgroundColor: "white" }}
    />
  );
}
