import { LoginSection } from "@/components/sections/auth/login-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const LoginPage = () => {
  return (
    <div className="w-full">
      <LoginSection />
    </div>
  );
};

export default LoginPage;
