import { InputForm } from "@/components/input-form/input-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      return toast({
        variant: "destructive",
        title: "Failed registered",
        description: `Please enter your password and try again`,
      });
    }

    try {
      await axios.post(`${import.meta.env.VITE_URL_API}/auth/register`, {
        email,
        username,
        password,
        passwordConfirm,
      });
      toast({
        variant: "success",
        title: "Succesfully registered",
      });
      navigate("/login");
    } catch (err) {
      let errorMessage = "Unknown error occurred";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error?.message || errorMessage;
      }

      toast({
        variant: "destructive",
        title: "Failed registered",
        description: `${errorMessage}`,
      });
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <InputForm id="email" label="Email" type="email" placeholder="jhondoe@gmail.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <InputForm id="username" type="text" label="Username" placeholder="jhondoe" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                <InputForm id="password" label="Password" type="password" placeholder="*****" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <InputForm id="passwordConfirm" label="Password Confirm" type="password" placeholder="*****" value={passwordConfirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)} />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" onClick={handleSubmit}>
              Register
            </Button>
            <p className="text-gray-500">
              Already you have account?{" "}
              <span onClick={() => navigate("/login")} className="text-black font-bold cursor-pointer">
                Login
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
