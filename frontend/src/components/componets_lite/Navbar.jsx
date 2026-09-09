import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "@/utilis/data";
import axios from "axios";
import { setUser } from "@/redux/authslice";
import { toast } from "sonner";

const Navbar = () => {
  
  const {user} = useSelector((store) => store.auth); // Access the user state from Redux
 const dispatch = useDispatch();
 const navigate =useNavigate();

  const logoutHandler = async () => {
  const response = await axios.post(`${USER_API_ENDPOINT}/logout`, {}, { withCredentials: true });
  if(response.data.success){
    
    dispatch(setUser(null));
    navigate("/");
    toast.success("Logout successfully");
  }
      try {
        
      } catch (error) {
        console.log(error);
      toast.error("error.response.data.message || ");
    }
  }
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-5xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-[#6B3AC2]">Job</span> 
            <span className="text-[#FA4F09]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <ul className="flex items-center font-medium gap-6">
            {
              user && user.role === "Recruiter" ? (
              <>
               <li> <Link to={"/admin/company"}> Company</Link></li>
           <li> <Link to={"/admin/jobs"}> Jobs</Link></li>
              </>
              ):(
                <>
                   <li> <Link to={"/Home"}> Home</Link></li>
           <li> <Link to={"/Browse"}> Browse</Link></li>
         <li>  <Link to= {"/Jobs"}> Jobs</Link></li>
                </>
              )
            }

        
          </ul>

          {!user ? (
             <div className="flex items-center gap-2">
    <Link to="/login">
      <Button variant="outline">Login</Button>
    </Link>

    <Link to="/register">
      <Button className="bg-red-500 hover:bg-red-700">
        Register
      </Button>
    </Link>
  </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div className="flex items-center gap-4">

                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>

                  <div>
                    <h3 className="font-medium">{user?.fullname}</h3>
                    <p className="text-sm text-muted-foreground">
                    {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "Student" && (
                      <div className="flex items-center gap-2 cursor-pointer">
                    <User2 size={18} />
                    <Button variant="link"><Link to={"/profile"}>Profile</Link></Button>
                  </div>
                  )}
                

                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut size={18} />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;