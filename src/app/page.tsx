import { auth } from "../auth";
import LandingScreen from "@/components/LandingScreen";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <LandingScreen />
    </main>
  );
}
