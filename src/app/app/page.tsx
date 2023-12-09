import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function AppPage() {
  const session = await auth();

  const user = session?.user;

  console.log("rendered on the server or client");

  if (!user) redirect("/");

  return <p>app</p>;
}
