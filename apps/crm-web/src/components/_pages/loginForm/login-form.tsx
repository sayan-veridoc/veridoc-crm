"use client";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme/toggleModeBtn";
import Image from "next/image";
import { GradientHeading } from "@/components/ui/heading";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/service/auth";
import { AuthResponse } from "@/types";

type FormInput = {
  identifier: string;
  password: string;
};

export function LoginForm() {
  const schema: ZodType<FormInput> = z.object({
    identifier: z
      .string()
      .min(1, { message: "Email or Username is required" })
      .refine(
        (value) =>
          value.includes("@")
            ? z.string().email().safeParse(value).success
            : true,
        { message: "Invalid email format" }
      ),
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
      identifier: "",
      password: "",
    },
  });

  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: loginService,
    onSuccess: (data: AuthResponse) => {
      toast.success("Login Successfull!", {
        description() {
          return (
            <pre className="mt-2 rounded-md  p-4">
              <code className="text-wrap">
                {JSON.stringify(data.user, null, 2)}
              </code>
            </pre>
          );
        },
      });
    },
  });
  async function onSubmit(data: FormInput) {
    await loginMutation(data);
  }

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
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="identifier">
                      Email or Username{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        id="identifier"
                        className={
                          form.formState.errors.identifier &&
                          "focus-visible:ring-destructive"
                        }
                        type="text"
                        {...field}
                        placeholder="Enter your email or username"
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
                    <div className="flex items-center">
                      <FormLabel htmlFor="password">
                        Password <span className="text-destructive">*</span>
                      </FormLabel>
                      <Link
                        href={"/forgotpassword"}
                        className={cn(
                          buttonVariants({ variant: "link", size: "sm" }),
                          "px-0 text-sm ml-auto text-secondary-foreground"
                        )}
                      >
                        Lost your password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordField
                        id="password"
                        className={
                          form.formState.errors.password &&
                          "focus-visible:ring-destructive"
                        }
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" loading={isPending}>
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
