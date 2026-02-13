// "use client";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { axiosInstance } from "@/lib/axios";
// import { cn } from "@/lib/utils";
// import { useAuth } from "@/stores/auth";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import z from "zod";

// const formSchema = z
//   .object({
//     password: z.string().min(5, "Password must be at least 5 characters."),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Passwords do not match.",
//   });

// export function ResetPasswordForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const { onAuthSuccess } = useAuth();

//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const { mutateAsync: resetPassword, isPending } = useMutation({
//     mutationFn: async (data: z.infer<typeof formSchema>) => {
//       const result = await axiosInstance.post("/auth/reset-password", {
//         password: data.password,
//         confirmPassword: data.confirmPassword,
//       });

//       return result.data;
//     },
//     onSuccess: async (result) => {
//       toast.success("Reset passwod success!");
//       router.push("/login");
//     },
//     onError: (error: AxiosError<{ message: string }>) => {
//       toast.error(error.response?.data.message ?? "Something went wrong!");
//     },
//   });

//   async function onSubmit(data: z.infer<typeof formSchema>) {
//     await resetPassword(data);
//   }

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card className="overflow-hidden p-0">
//         <CardContent>
//           <form
//             className="p-6 md:p-8"
//             id="form-login"
//             onSubmit={form.handleSubmit(onSubmit)}
//           >
//             <FieldGroup>
//               <div className="flex flex-col items-center gap-2 text-center">
//                 <h1 className="text-2xl font-bold">Reset Password</h1>
//                 <p className="text-muted-foreground text-balance">
//                   Enter your new password below{" "}
//                 </p>
//               </div>

//               <Controller
//                 name="password"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel htmlFor="password">New Password</FieldLabel>
//                     <Input
//                       {...field}
//                       id="password"
//                       type="password"
//                       aria-invalid={fieldState.invalid}
//                       placeholder="Your password"
//                     />
//                     {fieldState.invalid && (
//                       <FieldError errors={[fieldState.error]} />
//                     )}
//                   </Field>
//                 )}
//               />

//               <Controller
//                 name="confirmPassword"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel htmlFor="confirmPassword">
//                       Confirm New Password
//                     </FieldLabel>
//                     <Input
//                       {...field}
//                       id="confirmPassword"
//                       type="password"
//                       aria-invalid={fieldState.invalid}
//                       placeholder="Confirm password"
//                     />
//                     {fieldState.invalid && (
//                       <FieldError errors={[fieldState.error]} />
//                     )}
//                   </Field>
//                 )}
//               />

//               <Field>
//                 <Button type="submit" form="form-login" disabled={isPending}>
//                   {isPending ? "Loading" : "Submit"}
//                 </Button>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
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
        }
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
    <div className={cn("flex flex-col gap-6 w-full max-w-md", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent>
          <form
            className="p-6 md:p-8 flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="text-center">
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
        </CardContent>
      </Card>
    </div>
  );
}
