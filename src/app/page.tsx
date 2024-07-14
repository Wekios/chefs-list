import { redirect } from "next/navigation";

import LandingScreen from "~/components/LandingScreen";
import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  if (session?.user) redirect("/home");

  return <LandingScreen />;
}
