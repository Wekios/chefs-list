import { Divider, Link, Stack, Typography } from "@mui/joy";
import NextLink from "next/link";

import { SocialSignIn } from "../components/Actions";
import { SignUpForm } from "../components/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <Stack gap={2}>
        <Typography component="h1" level="h1">
          Sign up
        </Typography>
        <SocialSignIn provider="github" />
        <SocialSignIn provider="google" />
      </Stack>
      <Divider>or</Divider>
      <Stack gap={4}>
        <SignUpForm />
        <Typography level="body-sm">
          Have an account?{" "}
          <Link component={NextLink} href="/auth/sign-in" level="title-sm">
            Sign in!
          </Link>
        </Typography>
      </Stack>
    </>
  );
}
