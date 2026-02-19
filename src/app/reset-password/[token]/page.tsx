// import React from "react";
// import ResetPasswordForm from "./components/reset-password-form";

// const ResetPassword = () => {
//   return (
//     <div className="bg-muted flex min-h-svh items-center justify-center p-6 md:p-10">
//       <div className="w-full max-w-sm">
//         <ResetPasswordForm />
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

"use client";

import { useParams } from "next/navigation";
import ResetPasswordForm from "./components/reset-password-form";

export default function ResetPasswordPage() {
  const params = useParams();

  const token = params.token as string;

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Invalid or missing token
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {" "}
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
