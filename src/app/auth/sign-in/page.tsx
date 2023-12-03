import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { SocialSignIn } from "../components/Actions";
import NextLink from "next/link";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function SignInPage() {
  return (
    <>
      <Stack gap={4} sx={{ mb: 2 }}>
        <Stack gap={1}>
          <Typography level="h3">Sign in</Typography>

          <SocialSignIn provider="github" />
          <SocialSignIn provider="google" />
        </Stack>
      </Stack>
      <Divider>or</Divider>
      <Stack gap={4} sx={{ mt: 2 }}>
        {/* <form
          onSubmit={(event: React.FormEvent<SignInFormElement>) => {
            event.preventDefault();
            const formElements = event.currentTarget.elements;
            const data = {
              email: formElements.email.value,
              password: formElements.password.value,
              persistent: formElements.persistent.checked,
            };
            alert(JSON.stringify(data, null, 2));
          }}
        >
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" />
          </FormControl>
          <Stack gap={4} sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Checkbox size="sm" label="Remember me" name="persistent" />
              <Link level="title-sm" href="#replace-with-a-link">
                Forgot your password?
              </Link>
            </Box>
            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </Stack>
        </form> */}
        <Typography level="body-sm">
          New to the app?{" "}
          <Link component={NextLink} href="/auth/sign-up" level="title-sm">
            Sign up!
          </Link>
        </Typography>
      </Stack>
    </>
  );
}
