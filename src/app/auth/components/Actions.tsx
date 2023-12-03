import { Button } from "@mui/joy";
import GoogleIcon from "./GoogleIcon";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signIn, signOut } from "@/auth";

type Provider = "google" | "github";

const iconMap = {
  google: <GoogleIcon />,
  github: <GitHubIcon />,
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
        variant="soft"
        color="neutral"
        fullWidth
        startDecorator={iconMap[provider]}
        type="submit"
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
        await signOut();
      }}
    >
      <Button variant="plain" type="submit" {...props}>
        Sign out
      </Button>
    </form>
  );
}
