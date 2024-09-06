import { InputForm } from "@/components/input-form/input-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { ModalOTP } from "@/components/modalOTP";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNeedOtp, setIsNeedOtp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_URL_API}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (result.data.data.isNeedOTP) {
        setIsNeedOtp(true);
        return;
      }

      toast({
        variant: "success",
        title: "Succesfully login",
        description: "You are now logged in!",
      });
      navigate("/");
    } catch (err) {
      let errorMessage = "Unknown error occurred";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error?.message || errorMessage;
      }

      toast({
        variant: "destructive",
        title: "Failed login",
        description: `${errorMessage}`,
      });
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      try {
        await axios.post(`${import.meta.env.VITE_URL_API}/auth/google`, userInfo, { withCredentials: true });

        toast({
          variant: "success",
          title: "Succesfully login",
          description: "You are now logged in with Google!",
        });
        navigate("/");
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
      }
    },
  });

  return (
    <>
      {isNeedOtp && <ModalOTP isOpen={isNeedOtp} onClose={() => setIsNeedOtp(false)} email={email} />}

      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <InputForm id="email" label="Email" type="email" placeholder="jhondoe@gmail.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <InputForm id="password" label="Password" type="password" placeholder="*****" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" onClick={handleSubmit}>
              Login
            </Button>
            <h1 onClick={() => navigate("/reset-password")} className="cursor-pointer">
              forgot password?
            </h1>
            <p className="text-gray-500">
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")} className="text-black font-bold cursor-pointer">
                Register
              </span>
            </p>
            <button className="bg-white w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center space-x-2 shadow-md hover:shadow-lg" onClick={() => loginWithGoogle()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="w-6 h-6">
                <path fill="#4285f4" d="M505.3 278.8c0-18.5-1.5-36.7-4.3-54.8H261.8v98.7h136.2c-6 32.8-26.3 61.7-56.3 80.1v66h89.6c52.4-48.3 82.7-119.4 82.7-200.1" />
                <path fill="#34a853" d="M261.8 547.1c74.5 0 137.3-24.4 182.3-66.5l-89.6-66c-25.1 17.1-56.8 27-92.7 27-71 0-130.6-46.2-152.2-110.7H9.7v66.1c44 87.1 135.1 146.8 242.1 146.8" />
                <path fill="#fbbc05" d="M109.6 329.3c-3.2-9.7-4.9-19.9-4.9-30.3 0-10.4 1.7-20.6 4.9-30.3V202.6H9.7c-17.8 53.5-27.9 110.5-27.9 175.5 0 65 10.1 122 27.9 175.5h95.1v-96.7" />
                <path fill="#0f9d58" d="M261.8 101.2c41.8 0 77.1 14.4 104.9 42.4l79.1-79.1C398.9 24.4 336.3 0 261.8 0 155.8 0 62.7 59.7 18.7 151.8l90.9 70.4c21.6-64.5 81.2-110.7 152.2-110.7" />
              </svg>
              <span>Masuk dengan Google</span>
            </button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
