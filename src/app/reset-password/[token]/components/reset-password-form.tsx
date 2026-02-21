"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { GiSharkFin } from "react-icons/gi";
import { toast } from "sonner";
import z from "zod";

const formSchema = z
  .object({
    password: z.string().min(5, "Password must be at least 5 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

type Props = {
  token: string;
};

export default function ResetPasswordForm({
  className,
  token,
  ...props
}: Props & React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: resetPassword, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const result = await axiosInstance.post(
        "/auth/reset-password",
        {
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return result.data;
    },
    onSuccess: () => {
      toast.success("Reset password success!");
      router.push("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await resetPassword(data);
  }

  return (
    <div
      className={cn("grid min-h-screen lg:grid-cols-2", className)}
      {...props}
    >
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

          <form
            className="flex flex-col gap-4 p-6 md:p-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="mb-5 text-start">
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p className="text-muted-foreground">
                Enter your new password below
              </p>
            </div>

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>New Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="New password"
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
                  <FieldLabel>Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? "Processing..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
