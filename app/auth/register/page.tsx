import React from "react";
import AuthRegisterFeature from "@/features/Auth/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

const AuthRegister = () => {
  return <AuthRegisterFeature />;
};

export default AuthRegister;
