import { Header } from "@/components/Header";
import Layout from "@/components/Layout";
import { Navigation } from "@mui/icons-material";
import { Stack, Button } from "@mui/joy";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* {drawerOpen && ( 
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          // TODO: add nav 
        </Layout.SideDrawer>
      */}
      <Stack
        id="tab-bar"
        direction="row"
        spacing={1}
        sx={{
          py: 2,
          justifyContent: "space-around",
          zIndex: "999",
          bottom: 0,
          width: "100dvw",
          position: "fixed",
          borderTop: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.body",
          display: { xs: "flex", sm: "none" },
        }}
      >
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="/joy-ui/getting-started/templates/email/"
          size="sm"
          startDecorator={<EmailRoundedIcon />}
          sx={{ flexDirection: "column", "--Button-gap": 0 }}
        >
          Email
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/team/"
          size="sm"
          startDecorator={<PeopleAltRoundedIcon />}
          sx={{ flexDirection: "column", "--Button-gap": 0 }}
        >
          Team
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/files/"
          size="sm"
          startDecorator={<FolderRoundedIcon />}
          sx={{ flexDirection: "column", "--Button-gap": 0 }}
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
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        {children}
      </Layout.Root>
    </>
  );
}
