"use server";

import { AuthError } from "next-auth";

import { SignInSchema } from "~/app/validation";
import { signIn } from "~/server/auth";

export async function authenticate(signInData: SignInSchema) {
  try {
    await signIn("credentials", signInData);
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return "Invalid credentials";
      } else {
        return "An unexpected error has occurred";
      }
    }
    throw error;
  }
}
