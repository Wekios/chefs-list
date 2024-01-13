import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "./ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chef's list",
  description: "An app to help you manage your recipes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-joy-color-scheme="dark">
      <body className={inter.className}>
        <ThemeRegistry options={{ key: "joy" }}>
          <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
