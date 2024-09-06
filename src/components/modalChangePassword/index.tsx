import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { InputForm } from "../input-form/input-form";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface ModalChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalChangePassword: React.FC<ModalChangePasswordProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (oldPassword.length === 0 || newPassword.length === 0 || newPasswordConfirm.length === 0) {
      return toast({
        variant: "destructive",
        title: "Failed change password",
        description: `Please enter your input and try again`,
      });
    }

    if (newPassword !== newPasswordConfirm) {
      return toast({
        variant: "destructive",
        title: "Failed change password",
        description: `New password and confirmation do not match`,
      });
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_URL_API}/auth/change-password`,
        {
          oldPassword,
          newPassword,
          newPasswordConfirm,
        },
        { withCredentials: true }
      );
      toast({
        variant: "success",
        title: "Succesfully change password",
      });
      onClose();
    } catch (err) {
      let errorMessage = "Unknown error occurred";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.error?.message || errorMessage;
      }

      toast({
        variant: "destructive",
        title: "Failed change password",
        description: `${errorMessage}`,
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[350px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="gap-4 py-4 flex justify-center ">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4 ">
                <InputForm id="oldPassword" label="Old Password" type="password" placeholder="*****" value={oldPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)} />
                <InputForm id="newPassword" label="New Password" type="password" placeholder="*****" value={newPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} />
                <InputForm id="newPasswordConfirm" label="New Password Confirm" type="password" placeholder="*****" value={newPasswordConfirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPasswordConfirm(e.target.value)} />
              </div>
            </form>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={handleSubmit}>
              Send Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
