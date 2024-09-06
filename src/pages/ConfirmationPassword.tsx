import { InputForm } from "@/components/input-form/input-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const ConfirmationPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  // Ambil parameter token dari URL
  const token = location.search.startsWith("?") ? location.search.slice(1) : location.search;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      return toast({
        variant: "destructive",
        title: "Failed New Password",
        description: `Please fill in the same password and confirm the password`,
      });
    }

    try {
      await axios.put(`${import.meta.env.VITE_URL_API}/auth/reset-password/${token}`, {
        password,
        passwordConfirm,
      });
      toast({
        variant: "success",
        title: "Succesfully reset password",
      });
      navigate("/login");
    } catch (err) {
      let errorMessage = "Unknown error occurred";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error?.message || errorMessage;
      }

      toast({
        variant: "destructive",
        title: "Failed new password",
        description: `${errorMessage}`,
      });
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl">New Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <InputForm id="password" label="Password" type="password" placeholder="*****" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <InputForm id="passwordConfirm" label="Password Validation" type="password" placeholder="*****" value={passwordConfirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)} />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" onClick={handleSubmit}>
              Send New Password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
