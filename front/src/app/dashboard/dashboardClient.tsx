"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import GroupChatCard from "@/components/groupChat/GroupChatCard";
import CreateChat from "@/components/groupChat/CreateChat";
import { GroupChatType } from "@/types";
import GroupSkeleton from "./skeleton";
import DashNav from "@/components/groupChat/DashNav";

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export default function DashboardClient({
  session,
  groupsPromise,
}: {
  session: CustomUser;
  groupsPromise: Promise<GroupChatType[]>;
}) {
  const [groups, setGroups] = useState<GroupChatType[] | null>(null);

  useEffect(() => {
    groupsPromise.then((data) => setGroups(data));
  }, [groupsPromise]);


  return (
     
    <div>
      
       {/*@ts-expect-error avoiding error */}
      <DashNav name={session.name} image={session.image} />
      <p className="mt-10 m-auto w-[90%] text-center text-2xl font-bold">Welcome to your dashboard. Manage your chat groups, conversations, and real-time activity all in one place.</p>

      <div className="container m-auto w-[95%]">
        <div className="flex justify-end mt-10">
          <CreateChat user={session} />
        </div>

        {!groups ? (
          <GroupSkeleton />
        ) : groups.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8" />
            <p className="ml-3 text-lg">Loading chats...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group, index) => (
              <GroupChatCard key={index} group={group} user={session} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
