import { InputForm } from "@/components/input-form/input-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.get(`${import.meta.env.VITE_URL_API}/auth/reset-password/${email}`);
      toast({
        variant: "success",
        title: "Check confirmation in your email",
      });
    } catch (err) {
      let errorMessage = "Unknown error occurred";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error?.message || errorMessage;
      }

      toast({
        variant: "destructive",
        title: "Failed confirmation",
        description: `${errorMessage}`,
      });
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <InputForm id="email" label="Email" type="email" placeholder="jhondoe@gmail.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" onClick={handleSubmit}>
              Send Confirmation
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
