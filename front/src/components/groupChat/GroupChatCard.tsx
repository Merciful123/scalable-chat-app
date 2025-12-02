import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
import { GroupChatType } from "@/types";

export default function GroupChatCard({
  group,
  user,
}: {
  group: GroupChatType;
  user: CustomUser;
}) {
  return (
    <Card>
      <CardHeader className=" flex justify-between items-center ">
        <CardTitle className="text-2xl">{group.title}</CardTitle>
        <div className="cursor-pointer *:cursor-pointer">
          <GroupChatCardMenu user={user} group={group} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Passcode :-<strong>{group.passcode}</strong>
        </p>
        <p className="text-sm">Created at :-{new Date(group.created_at).toDateString()}</p>
      </CardContent>
    </Card>
  );
}
