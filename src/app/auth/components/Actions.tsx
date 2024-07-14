import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@mui/joy";

import { signIn, signOut } from "~/server/auth";

import GoogleIcon from "./GoogleIcon";

type Provider = "github" | "google";

const iconMap = {
  github: <GitHubIcon />,
  google: <GoogleIcon />,
} as const;

export function SocialSignIn({
  provider,
  ...props
}: { provider: Provider } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button
        color="neutral"
        fullWidth
        startDecorator={iconMap[provider]}
        type="submit"
        variant="soft"
        {...props}
      >
        Continue with {provider}
      </Button>
    </form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit" variant="plain" {...props}>
        Sign out
      </Button>
    </form>
  );
}
