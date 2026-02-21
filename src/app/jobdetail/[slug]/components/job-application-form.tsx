"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const formSchema = z.object({
  fullName: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
  address: z.string(),
  lastEducation: z.string(),
  expectedSalary: z.string(),

  cvFile: z.instanceof(File).refine((file) => file.type === "application/pdf", {
    message: "CV must be PDF",
  }),
});

type JobApplicationFormProps = {
  jobPostingId: string;
} & React.ComponentProps<"div">;

export function JobApplicationForm({
  jobPostingId,
  className,
  ...props
}: JobApplicationFormProps) {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      lastEducation: "",
      expectedSalary: "",
      cvFile: undefined,
    },
  });

  const { mutateAsync: applyJob, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("address", data.address);
      formData.append("lastEducation", data.lastEducation);
      formData.append("expectedSalary", data.expectedSalary);

      formData.append("jobPostingId", jobPostingId);

      formData.append("cvFilePath", data.cvFile);

      await axiosInstance.post(`/applicant/`, formData, {
        headers: { Authorization: `Bearer ${session.data?.user.accessToken}` },
      });
    },

    onSuccess: () => {
      toast.success("Apply job success!");
      queryClient.invalidateQueries({ queryKey: ["applicant"] });
      router.push("/my-application");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await applyJob(data);
  }

  return (
    <div className="bg-card sticky top-24 space-y-6 rounded-lg p-6 shadow-md">
      <form
        className="p-6 md:p-8"
        id="form-apply"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <div>
            <Controller
              name="cvFile"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="cvFile">Resume/CV</FieldLabel>
                  <Input
                    id="cvFile"
                    type="file"
                    accept="application/pdf"
                    aria-invalid={fieldState.invalid}
                    placeholder="Upload your resume here to add it to your application fields"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        field.onChange(file);
                      }
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="mt-3 space-y-3">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="fullName"
                      type="fullName"
                      aria-invalid={fieldState.invalid}
                      placeholder="John"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

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
                      placeholder="m@example.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="phoneNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                    <Input
                      {...field}
                      id="phoneNumber"
                      type="phoneNumber"
                      aria-invalid={fieldState.invalid}
                      placeholder="08112342222"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="address">Address</FieldLabel>
                    <Input
                      {...field}
                      id="address"
                      type="address"
                      aria-invalid={fieldState.invalid}
                      placeholder="Jl. Soekarno Hatta"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastEducation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lastEducation">
                      Last Education
                    </FieldLabel>
                    <Input
                      {...field}
                      id="lastEducation"
                      type="lastEducation"
                      aria-invalid={fieldState.invalid}
                      placeholder="Bachelor Degree in Computer Science"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="expectedSalary"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="expectedSalary">
                      Expected Salary
                    </FieldLabel>
                    <Input
                      {...field}
                      id="expectedSalary"
                      type="expectedSalary"
                      aria-invalid={fieldState.invalid}
                      placeholder="10000000"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <Field>
            <Button
              type="submit"
              form="form-apply"
              disabled={isPending}
              className="bg-foreground text-background hover:bg-foreground/90 w-full rounded-lg py-3 font-semibold transition-colors"
            >
              {isPending ? "Loading" : "Submit Application"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
