
// import ChatList from "./ChatList"

export default function ChatHome() {
  return (
    <div className="flex h-full">
    {/* <div className=" w-[600px]">
      <h1 className="text-2xl font-bold !p-2">Chat</h1>
      <ChatList variant="all"/>
    
    </div>  */}
    <div className="flex  items-center justify-center p-4 !h-full !w-full bg-red-500">
      <div className=" text-center">
        <h1 className="mb-2 text-2xl font-semibold">Welcome to vTeams</h1>
        <p className="text-pretty text-xl">
          Select a conversation from the sidebar or start a video meeting.
        </p>
      </div>
    </div>
    </div> 
  )
}
