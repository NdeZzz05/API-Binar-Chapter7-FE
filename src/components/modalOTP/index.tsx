import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ModalOTPProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const ModalOTP: React.FC<ModalOTPProps> = ({ isOpen, onClose, email }) => {
  const [OTP, setOTP] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOTPChange = (value: string) => {
    setOTP(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await axios.put(
        `${import.meta.env.VITE_URL_API}/auth/verify-otp`,
        {
          email,
          OTP,
        },
        { withCredentials: true }
      );

      Cookies.set("accessToken", result.data.data.accessToken, { expires: 7 });
      Cookies.set("refreshToken", result.data.data.refreshToken, { expires: 7 });

      toast({
        variant: "success",
        title: "Succesfully login",
        description: "You are now logged in!",
      });

      onClose();
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[350px]">
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
            <DialogDescription>This OTP is valid for only 10 minutes. Please do not share this OTP with anyone.</DialogDescription>
          </DialogHeader>
          <div className="gap-4 py-4 flex justify-center">
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={handleOTPChange}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </form>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={handleSubmit}>
              Send Verify OTP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
