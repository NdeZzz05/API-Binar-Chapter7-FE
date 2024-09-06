import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layouts/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Socket, io } from "socket.io-client";
import { Button } from "@/components/ui/button";

interface UserDataTypes {
  id: string;
  email: string;
  username: string;
}

export const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataTypes | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { toast } = useToast();
  // const [list_notifications, setListNotifications] = useState<null[]>([]);

  const handleDecode = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_API}/auth/decode`, { withCredentials: true });

      setUserData(response.data.data);

      return response;
    } catch (error) {
      let errorMessage = "Unknown error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error?.message || errorMessage;
      }

      toast({
        variant: "destructive",
        title: "Failed login",
        description: `${errorMessage}`,
      });

      navigate("/login");
    }
  };

  // UseEffect IO
  useEffect(() => {
    if (userData) {
      // Decode JWT
      console.log(userData, "bb");

      const { id } = userData;

      const initSocket = io("http://localhost:3001", {
        query: {
          id,
        },
      });

      setSocket(initSocket);

      // Listen for connection
      initSocket.on("connect", () => {
        console.log("Connected to the server with socket ID:", initSocket.id);
      });

      // Listen for disconnection
      initSocket.on("disconnect", () => {
        console.log("Disconnected from the server");
      });

      // Cleanup
      return () => {
        initSocket.disconnect();
      };
    }
  }, [userData]);

  const handleTestEmit = () => {
    if (userData && userData.id) {
      const { id } = userData;

      console.log("aaaa");

      socket?.emit("new-notification", {
        message: "Hello, this is a test notification",
        recipientId: id,
      });
    } else {
      toast({
        variant: "destructive",
        title: "User data not available",
        description: "Cannot send notification without user ID",
      });
    }
  };

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("new-notification", (data) => {
  //       setListNotifications((prev) => [...prev, data]);
  //     });

  //     // Cleanup listener ketika komponen di-unmount
  //     return () => {
  //       socket.off("new-notification");
  //     };
  //   }
  // }, [socket]);

  useEffect(() => {
    handleDecode();
  }, []);

  return (
    <>
      <Header userData={userData} />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Home</h1>
          <Button onClick={handleTestEmit}>Tes Emit</Button>
        </div>
      </div>
    </>
  );
};
