import { Outlet } from "react-router-dom";
// import SideBar from "../components/ui/SideBar";
import ChatList from "../components/chat/ChatList";
import SideBar from "../components/ui/SideBar";

export default function Layout() {
  return (
    <div className="flex h-screen">
      

        <SideBar/>
      <div className=" w-[600px]">
      <h1 className="text-2xl font-bold !p-2">Chat</h1>
      <ChatList variant="all"/>
    
    </div> 

      <div className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </div>
    </div>
  );
} 