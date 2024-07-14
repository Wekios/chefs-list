import { Box, Button, Checkbox, FormControl, FormLabel, Input } from "@mui/joy";
import Divider from "@mui/joy/Divider";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import NextLink from "next/link";

import { SocialSignIn } from "../components/Actions";
import { SignInForm } from "../components/SignInForm";

export default function SignInPage() {
  return (
    <>
      <Stack gap={2}>
        <Typography component="h1" level="h1">
          Sign in
        </Typography>
        <SocialSignIn provider="github" />
        <SocialSignIn provider="google" />
      </Stack>
      <Divider>or</Divider>
      <Stack gap={4}>
        <SignInForm />
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
