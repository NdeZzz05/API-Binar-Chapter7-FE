import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export const VerifyOTP = () => {
  const [IsNeedOtp, setIsNeedOtp] = useState(true);
  const [OTP, setOTP] = useState("");

  console.log(OTP.length);

  const handleOTPChange = (value: string) => {
    setOTP(value);
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        {IsNeedOtp && (
          <Dialog open={IsNeedOtp} onOpenChange={(open) => (open ? null : setIsNeedOtp(false))}>
            <DialogContent className="sm:max-w-[350px]">
              <DialogHeader>
                <DialogTitle>Verify OTP</DialogTitle>
                <DialogDescription>This OTP is valid for only 5 minutes. Please do not share this OTP with anyone.</DialogDescription>
              </DialogHeader>
              <div className="gap-4 py-4 flex justify-center">
                <form>
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
                <Button className="w-full">Send Verify OTP</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
};
