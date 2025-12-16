import { MessageCircle, PhoneCall, Settings } from "lucide-react"
import { Link } from "react-router-dom"


export default function SideBar(){
    return (
        <div className="flex flex-col bg-black h-full w-16 items-center gap-10 !py-3">  
            <Link to= ""><MessageCircle className="icon size-7 text-gray-400  !mt-10" /></Link>
            <Link to= ""> <PhoneCall className="icon size-7 text-gray-400" /></Link>
            <Link to= ""> <Settings className="icon size-7 text-gray-400 !mt-auto" /></Link>
        </div>
    ) 
} 