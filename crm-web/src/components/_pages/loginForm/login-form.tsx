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

type FormInput = {
  email: string;
  password: string;
};

export function LoginForm() {
  const schema: ZodType<FormInput> = z.object({
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
      email: "",
      password: "",
    },
  });
  function onSubmit(data: FormInput) {
    toast.message("You submitted the following values:", {
      description() {
        return (
          <pre className="mt-2 rounded-md  p-4">
            <code className="text-secondary-foreground">
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        );
      },
    });
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
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
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
