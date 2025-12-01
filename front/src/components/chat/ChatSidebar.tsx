import { GroupChatUserType } from "@/types";


export default function ChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {

  return (
    <div className="hidden md:block h-screen overflow-y-auto w-1/5  px-2 bg-sky-100!">
      <h1 className="text-2xl font-extrabold py-4 ">Users</h1>
      {users.length > 0 &&
        users.map((item, index) => (
          <div key={index} className="bg-white rounded-md p-2 mt-2">
            <p className="font-bold"> {item.name}</p>
            <p>
              Joined : <span>{new Date(item.created_at).toDateString()}</span>
            </p>
          </div>
        ))}
    </div>
  );
}
