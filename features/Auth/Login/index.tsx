"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginSchema, LoginSchema } from "./schema";
import useLoginMutation from "./hook/useLoginMutation";
import { Eye, EyeOff } from "lucide-react";

const AuthLoginFeature = () => {
  const form = useForm<ILoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="w-[400px] bg-white py-10 px-4 rounded-[12px] space-y-6">
        <div className="flex items-center justify-center">
          <Image
            src="/images/logo-img.png"
            alt="logo"
            width={134}
            height={24}
            priority
          />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values))}
            className="space-y-6"
          >
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        placeholder="Input username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          placeholder="Input password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute top-2.5 right-3 cursor-pointer"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <Eye className="w-4 h-4 opacity-50" />
                          ) : (
                            <EyeOff className="w-4 h-4 opacity-50" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-center font-normal leading-5 tracking-[0px]">
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="text-blue-600 underline underline-offset-[3px] hover:text-blue-600/80"
          >
            Register
          </a>
        </p>
      </div>
    </main>
  );
};

export default AuthLoginFeature;
