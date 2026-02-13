import React from "react";
import { ForgotPasswordForm } from "./components/forgot-password-form";

const ForgotPassword = () => {
  return (
    <div className="bg-muted flex min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
