import { auth } from "~/server/auth";
import { Calendar } from "~/components/Calendar/Calendar";

import { redirect } from "next/navigation";

export default async function AppPage() {
  const session = await auth();

  const user = session?.user;

  if (!user) redirect("/");

  return <Calendar />;
}
