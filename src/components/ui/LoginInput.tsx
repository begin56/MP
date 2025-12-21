import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginInput(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        if(!email || !password){
            toast.error("Please fill in all fields")
            return;
        }

        try {
      
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === "user@test.com" && password === "123456") {
            // resolve("Success");
            navigate('/chat')
          } else {
            reject();
            toast.error('err')
          } 
        }, 1000);
      });

      toast.success("Logged in successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(error.message || 'Error logging in ');
    } 
    }

    return (
        <div className=" border-2  flex p-2 items-center justify-center w-[400px] h-[400px]">        
            <div className="flex flex-col gap-2">
              <input type="email"  placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="!p-4 w-[300px]"/>
              <input type="password"  placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="!p-4 w-[300px]" />
              <button onClick={handleLogin} className="border-2 !p-4 w-[300px] hover:bg-blue-200 bg-blue-400 font-bold text-lg cursor-pointer">Login</button>
              <span className="text-lg bg-red-200">Not a user? Sign up</span>
            </div>
        </div>
    )
} 