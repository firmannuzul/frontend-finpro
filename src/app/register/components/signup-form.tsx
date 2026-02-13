"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Mouse } from "lucide-react";
import Link from "next/link";
import { GiSharkFin } from "react-icons/gi";

const formSchema = z
  .object({
    email: z.email(),
    password: z.string().min(5, "Password must be at least 5 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: register, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const result = await axiosInstance.post("/auth/register", {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: "APPLICANT",
      });
      return result.data;
    },
    onSuccess: () => {
      toast.success("Register success");
      router.push("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await register(data);
  }

  return (
    // <div className={cn("flex flex-col gap-6", className)} {...props}>
    <div className={cn("grid min-h-svh lg:grid-cols-2", className)} {...props}>
      {/* <Card className="overflow-hidden p-0"> */}
      {/* <CardContent className="grid p-0 md:grid-cols-2"> */}

      {/* Left Panel - Blue Gradient with Branding */}
      <div className="relative hidden overflow-hidden lg:block">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270,60%,45%)] via-[hsl(265,55%,40%)] to-[hsl(280,50%,30%)]" />

        {/* Decorative Circles */}
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full border border-[hsl(270,60%,60%)]/30" />
        <div className="absolute -bottom-48 -left-48 h-[700px] w-[700px] rounded-full border border-[hsl(270,60%,60%)]/20" />
        <div className="absolute -bottom-64 -left-64 h-[900px] w-[900px] rounded-full border border-[hsl(270,60%,60%)]/10" />

        {/* Branding Content */}
        <div className="relative flex h-full flex-col justify-end p-12 pb-20">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(0,0%,100%)]/20">
              <GiSharkFin className="h-5 w-5 text-[hsl(0,0%,100%)]" />
            </div>
          </div>
          <h2 className="font-heading text-4xl leading-tight font-bold text-[hsl(0,0%,100%)]">
            Shark
          </h2>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-[hsl(210,50%,85%)]">
            The most popular job platform for professionals and seekers in
            Southeast Asia
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex w-fit items-center rounded-full bg-[hsl(0,0%,100%)] px-6 py-2.5 text-sm font-semibold text-[hsl(270,60%,45%)] transition-colors hover:bg-[hsl(0,0%,95%)]"
          >
            Read More
          </Link>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="bg-background flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(270,60%,50%)]">
              <GiSharkFin className="h-4 w-4 text-[hsl(0,0%,100%)]" />
            </div>
            <span className="font-heading text-foreground text-lg font-bold">
              Shark
            </span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="font-heading text-foreground text-2xl font-bold">
              Create your account
            </h1>
            <p className="text-muted-foreground mt-1 text-base">
              Enter your email below to create your account
            </p>
          </div>

          <form
            className="p-6 md:p-8"
            id="form-register"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="example@mail.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Your password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field>
                <Button type="submit" form="form-register">
                  Create Account
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Sign up with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <a href="/login">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* <div className="bg-muted relative hidden md:block">
            <img
              src="/globe.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div> */}

          {/* </CardContent> */}
          {/* </Card> */}
        </div>
      </div>
    </div>
  );
}
