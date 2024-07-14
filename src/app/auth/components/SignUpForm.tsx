"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Typography } from "@mui/joy";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";

import { type SignUpSchema, signUpSchema } from "~/app/validation";
import { api } from "~/trpc/react";

export function SignUpForm() {
  const { control, handleSubmit } = useForm<SignUpSchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signUpSchema),
  });
  const mutation = api.auth.signUp.useMutation({
    onSuccess: async (body) => {
      if (body) {
        signIn("credentials", { email: body.email, password: body.password });
      }
    },
  });

  return (
    <form onSubmit={handleSubmit((body) => mutation.mutate(body))}>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <FormControl error={Boolean(fieldState.error)}>
            <FormLabel>Email</FormLabel>
            <Input {...field} />
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <FormControl error={Boolean(fieldState.error)}>
            <FormLabel>Password</FormLabel>
            <Input {...field} type="password" />
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        )}
      />
      <Button fullWidth loading={mutation.isPending} type="submit">
        Sign up
      </Button>
      {mutation.error && (
        <Typography color="danger" level="body-sm" textAlign="center">
          {mutation.error.message ? mutation.error.message : "An error occurred. Please try again."}
        </Typography>
      )}
    </form>
  );
}
