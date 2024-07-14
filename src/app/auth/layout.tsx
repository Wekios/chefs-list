import { Box, Typography } from "@mui/joy";
import GlobalStyles from "@mui/joy/GlobalStyles";
import { redirect } from "next/navigation";

import { Logo } from "~/components/Logo";
import { auth } from "~/server/auth";

import AuthImage from "../../../public/auth-image.jpg";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session?.user) redirect("/home");

  return (
    <>
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={{
          backdropFilter: "blur(12px)",
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            minHeight: "100dvh",
            px: 2,
            width: "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
          }}
        >
          <Box
            component="header"
            sx={{ alignItems: "center", display: "flex", justifyContent: "space-between", py: 3 }}
          >
            <Logo />
          </Box>
          <Box
            component="main"
            sx={{
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              borderRadius: "sm",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: "100%",
              mx: "auto",
              my: "auto",
              pb: 5,
              py: 2,
              width: 400,
            }}
          >
            {children}
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Wekios {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          background: `url(${AuthImage.src}) center / contain no-repeat`,
          bottom: 0,
          height: "100%",
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          position: "fixed",
          right: 0,
          top: 0,
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
        }}
      />
    </>
  );
}
