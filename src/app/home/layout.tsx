import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { Button, Stack } from "@mui/joy";
import { redirect } from "next/navigation";

import { Header } from "~/components/Header";
import Layout from "~/components/Layout";
import { auth } from "~/server/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect("/auth/sign-in");

  return (
    <>
      {/* {drawerOpen && ( 
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          // TODO: add nav 
        </Layout.SideDrawer>
      */}
      <Stack
        direction="row"
        id="tab-bar"
        spacing={1}
        sx={{
          backgroundColor: "background.body",
          borderColor: "divider",
          borderTop: "1px solid",
          bottom: 0,
          display: { sm: "none", xs: "flex" },
          justifyContent: "space-around",
          position: "fixed",
          py: 2,
          width: "100dvw",
          zIndex: "999",
        }}
      >
        <Button
          aria-pressed="true"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/email/"
          size="sm"
          startDecorator={<EmailRoundedIcon />}
          sx={{ "--Button-gap": 0, flexDirection: "column" }}
          variant="plain"
        >
          Email
        </Button>
        <Button
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/team/"
          size="sm"
          startDecorator={<PeopleAltRoundedIcon />}
          sx={{ "--Button-gap": 0, flexDirection: "column" }}
          variant="plain"
        >
          Team
        </Button>
        <Button
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/files/"
          size="sm"
          startDecorator={<FolderRoundedIcon />}
          sx={{ "--Button-gap": 0, flexDirection: "column" }}
          variant="plain"
        >
          Files
        </Button>
      </Stack>
      <Layout.Root
      // sx={{
      //   ...(drawerOpen && {
      //     height: "100vh",
      //     overflow: "hidden",
      //   }),
      // }}
      >
        <Layout.Header>
          {/* ugly hack put here for the time being because MUI doesn't work well with Server Components */}
          <div style={{ display: "flex", flexGrow: 1, justifyContent: "space-between" }}>
            <Header />
          </div>
        </Layout.Header>
        <Layout.SideNav>side nav</Layout.SideNav>
        {children}
      </Layout.Root>
    </>
  );
}
