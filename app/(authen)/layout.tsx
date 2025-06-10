import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen min-h-screen min-w-screen max-w-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
