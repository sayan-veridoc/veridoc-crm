import React from "react";
import { Metadata } from "next";
import { LoginForm } from "@/components/_pages/loginForm/login-form";

export const metadata: Metadata = {
  title: "Sign in to your account",
};

function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
