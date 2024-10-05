import { Box } from "@mui/joy";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
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
