import React from "react";
import AuthLoginFeature from "@/features/Auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const AuthLogin = () => {
  return <AuthLoginFeature />;
};

export default AuthLogin;
