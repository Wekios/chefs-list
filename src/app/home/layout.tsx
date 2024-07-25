import { Box } from "@mui/joy";
import { redirect } from "next/navigation";

import { auth } from "~/server/auth";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect("/auth/sign-in");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "var(--Sidebar-width) 1fr",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Sidebar />
      <Box component="main">{children}</Box>
    </Box>
  );
}
