"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, FormHelperText, FormLabel, Input, Typography } from "@mui/joy";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Controller, useForm } from "react-hook-form";

import { type SignInSchema, signInSchema } from "~/app/validation";

import { authenticate } from "../sign-in/actions";

export function SignInForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const { control, formState, handleSubmit } = useForm<SignInSchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async (body) => {
        setErrorMessage("");
        try {
          const res = await authenticate(body);
          if (res !== null) setErrorMessage(res);
        } catch (error) {
          setErrorMessage("An unexpected error has occurred");
        }
      })}
    >
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
      <Button fullWidth loading={formState.isSubmitting} type="submit">
        Sign in {formState.isSubmitting && "…"}
      </Button>
      {errorMessage && (
        <Typography color="danger" level="body-sm" textAlign="center">
          {errorMessage}
        </Typography>
      )}

      {/* <Stack gap={2} sx={{ mt: 2 }}> */}
      {/* <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}> */}
      {/* Not even sure what 'remember me' does <Checkbox size="sm" label="Remember me" name="persistent" /> */}
      {/* <Link component={NextLink} href="/" level="title-sm">
            TODO: Forgot your password?
          </Link> */}
      {/* </Box> */}
      {/* </Stack> */}
    </form>
  );
}
