import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterList } from "@/routes/RouterList";
import { Toaster } from "@/components/ui/toaster";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_GOOGLE_ID}>
        <RouterList />
        <Toaster />
      </GoogleOAuthProvider>
    </CookiesProvider>
  </StrictMode>
);
