import { RegisterSection } from "@/components/sections/auth/register-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

const RegisterPage = () => {
  return (
    <div className="w-full">
      <RegisterSection />
    </div>
  );
};

export default RegisterPage;
