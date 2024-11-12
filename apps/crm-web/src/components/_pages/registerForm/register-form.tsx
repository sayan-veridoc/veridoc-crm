"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordField } from "@/components/ui/passwordfield";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/shared/theme/toggleModeBtn";
import Image from "next/image";
import { GradientHeading } from "@/components/ui/heading";
import { useMutation } from "@tanstack/react-query";
import { registerService } from "@/service/auth";
import { AuthResponse } from "@/types";

type FormInput = {
  username: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const schema: ZodType<FormInput> = z.object({
    username: z.string().min(3, { message: "Username is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Invalid email format",
    }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters")
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/, {
        message:
          "Password must contain a combination of lowercase letters, numbers, and uppercase letters.",
      }),
  });
  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: registerMutation, isPending } = useMutation({
    mutationFn: registerService,
    onSuccess: (data: AuthResponse) => {
      toast.success("Account created Successfully!", {
        description() {
          return (
            <pre className="mt-2 rounded-md  p-4">
              <code className="text-secondary-foreground">
                {JSON.stringify(data.user, null, 2)}
              </code>
            </pre>
          );
        },
      });
    },
  });

  const onSubmit = async (data: FormInput) => {
    await registerMutation(data);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between pb-5 border-b ">
          <div className="flex items-center gap-1">
            <Image src={"/icon.png"} alt="logo" width={50} height={50} />
            <GradientHeading variant="solid" weight="base" size={"xs"}>
              VeriDoc CRM
            </GradientHeading>
          </div>
          <ThemeToggle />
        </div>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter your name and email below to create a account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">
                      Username <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        className={
                          form.formState.errors.username &&
                          "focus-visible:ring-destructive"
                        }
                        type="text"
                        {...field}
                        placeholder="Username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        id="email"
                        className={
                          form.formState.errors.email &&
                          "focus-visible:ring-destructive"
                        }
                        type="email"
                        {...field}
                        placeholder="Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">
                      Password <span className="text-destructive">*</span>
                    </FormLabel>

                    <FormControl>
                      <PasswordField
                        id="password"
                        className={
                          form.formState.errors.password &&
                          "focus-visible:ring-destructive"
                        }
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" loading={isPending}>
              Submit
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
