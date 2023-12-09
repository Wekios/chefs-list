import { redirect } from "next/navigation";
import { auth } from "../auth";
import LandingScreen from "@/components/LandingScreen";

export default async function Home() {
  const session = await auth();

  if (session?.user) redirect("/app");

  return <LandingScreen />;
}
