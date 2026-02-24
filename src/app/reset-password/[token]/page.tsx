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
    <div>
      <ResetPasswordForm token={token} />
    </div>
  );
}
