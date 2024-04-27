import Layout from "@/components/Layout";
import { RecipeManagement } from "./RecipeManagement";

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Layout.SidePane>
        <RecipeManagement />
      </Layout.SidePane>
      <Layout.Main>{children}</Layout.Main>
    </>
  );
}
