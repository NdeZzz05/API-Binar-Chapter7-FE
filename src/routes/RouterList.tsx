import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Home } from "@/pages/Home";
import { ResetPassword } from "@/pages/ResetPassword";
import { ConfirmationPassword } from "@/pages/ConfirmationPassword";
import { NotFound } from "@/pages/NotFound";
import { VerifyOTP } from "@/pages/VerifyOTP";

export const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/confirmation-password" element={<ConfirmationPassword />}></Route>
        <Route path="/verify-otp" element={<VerifyOTP />}></Route>

        {/* Handle not found */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
