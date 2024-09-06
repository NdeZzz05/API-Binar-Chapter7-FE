import { BellIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { LogOut, Lock } from "lucide-react";
import { useState } from "react";
import { ModalChangePassword } from "@/components/modalChangePassword";

interface UserData {
  id: string;
  email: string;
  username: string;
}
export const Header = ({ userData }: { userData: UserData | null }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [IsChangePassword, setIsChangePassword] = useState(false);
  // Add a conditional check for null or undefined userData
  if (!userData) {
    return (
      <div className="bg-black px-4 py-4 text-white">
        <div className="container m-auto">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">NdeZzz</h1>
            <div className="ml-auto">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_URL_API}/auth/logout`, { withCredentials: true });
      toast({
        variant: "success",
        title: "Sucessfully logged out",
        description: "You have been successfully logged out",
      });
      navigate("/login");
    } catch (error) {
      let errorMessage = "Unknown error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error?.message || errorMessage;
      }

      console.log(error);

      toast({
        variant: "destructive",
        title: "Failed logged out",
        description: `${errorMessage}`,
      });
    }
  };

  return (
    <>
      {IsChangePassword && <ModalChangePassword isOpen={IsChangePassword} onClose={() => setIsChangePassword(false)} />}

      <div className="bg-black px-4 py-4 text-white">
        <div className="container m-auto">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">NdeZzz</h1>
            <div className="ml-auto flex items-center mr-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative">
                    <BellIcon className="h-8 w-6" />
                    <Badge variant="default" className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-2 py-1">
                      5
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem className="truncate">Notification 1</DropdownMenuItem>
                  <DropdownMenuItem>Notification 2</DropdownMenuItem>
                  <DropdownMenuItem>Notification 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mr-4">
              <div className="flex flex-col ">
                <h3 className="text-sm font-bold">{userData.username}</h3>
                <p className="text-xs text-gray-500">Binar Academy</p>
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-medium pl-2">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="w-full cursor-pointer" onClick={() => setIsChangePassword(true)}>
                    <Lock className="mr-2 h-4 w-4" />
                    <span>Change Password</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="w-full cursor-pointer bg-red-500 text-secondary" onClick={() => handleLogout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
