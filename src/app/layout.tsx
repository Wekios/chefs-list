import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import ThemeRegistry from "./ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "An app to help you manage your recipes",
  title: "Chef's list",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-joy-color-scheme="dark" lang="en">
      <body className={inter.className}>
        <ThemeRegistry options={{ key: "joy" }}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
