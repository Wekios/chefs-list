import { Avatar, type AvatarProps } from "@mui/joy";

export function UserAvatar({
  src,
  ...rest
}: { src: null | string | undefined } & Omit<AvatarProps, "src">) {
  return (
    <Avatar
      alt="user avatar"
      slotProps={{ img: { referrerPolicy: "no-referrer" } }}
      src={src ?? "/chef-avatar.png"}
      sx={{ backgroundColor: "white" }}
      {...rest}
    />
  );
}
