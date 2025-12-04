import DashboardClient from "./dashboardClient";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchChatGroups } from "../fetch/groupFetch";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  //@ts-expect-error
  const groupsPromise = fetchChatGroups(session.user.token);

  return (
    <DashboardClient
     //@ts-expect-error
      session={session.user}
      groupsPromise={groupsPromise}
    />
  );
}
