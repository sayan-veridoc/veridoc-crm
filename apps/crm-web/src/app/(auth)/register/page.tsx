import React from "react";
import { Metadata } from "next";
import { RegisterForm } from "@/components/_pages/registerForm/register-form";

export const metadata: Metadata = {
  title: "Create a new account",
};

function RegisterPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
