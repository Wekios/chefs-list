import { auth } from "@/auth";
import { Header } from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  const user = session?.user;

  if (!user) redirect("/");

  return (
    <SessionProvider>
      <Header />
    </SessionProvider>
  );
}
