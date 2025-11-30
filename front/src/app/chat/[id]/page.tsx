import { fetchChats } from '@/app/fetch/chatsFetch';
import { fetchChatGroup, fetchChatGroupUsers } from '@/app/fetch/groupFetch';
import ChatBase from '@/components/chat/ChatBase'
import { GroupChatType, GroupChatUserType, MessageType } from '@/types';
import { notFound } from 'next/navigation';


export default async function chat ({params}:{params:{id: string}}) {
    // console.log("The group id is", params?.id)
  const { id } = await params;   
  console.log(id)
  if (id?.length !== 36) {
    return notFound();
  }
  const group: GroupChatType | null = await fetchChatGroup(id);
  if (group === null) {
    return notFound();
  } 

  const users: Array<GroupChatUserType> | [] =
    await fetchChatGroupUsers(id);
  
    const chats: Array<MessageType> | [] = await fetchChats(id);


  return (
    <div>
        <ChatBase users={users} group={group} oldMessages={chats}/>
    </div>
  )
}
