import { Sheet } from "@mui/joy";

import { RecipeManagement } from "./components/RecipeManagement";

export default async function RecipePage({ children }: { children: React.ReactNode }) {
  return (
    <Sheet
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "minmax(min-content, min(30%, 400px)) 1fr", xs: "1fr" },
        height: "100%",
        mx: "auto",
        pt: { sm: 0, xs: "var(--Header-height)" },
      }}
    >
      <Sheet
        sx={{
          position: { sm: "sticky", xs: "fixed" },
          top: 52,
          transform: {
            sm: "none",
            xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
          },
          transition: "transform 0.4s, width 0.4s",
          width: "100%",
          zIndex: 100,
        }}
      >
        <RecipeManagement />
      </Sheet>
      {children}
    </Sheet>
  );
}
