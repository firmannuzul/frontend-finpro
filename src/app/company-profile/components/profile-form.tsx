"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Briefcase, Globe, Lock, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { TbFileDescription } from "react-icons/tb";
import { toast } from "sonner";
import z from "zod";

const formSchemaProfile = z.object({
  companyName: z.string().optional(),
  description: z.string().optional(),
  websiteUrl: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
  logoPath: z.instanceof(File).optional(),
});

const formSchemaChangePassword = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const UpdateCompanyProfile = () => {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile-company"],
    queryFn: async () => {
      const res = await axiosInstance.get("/user/profile-company", {
        headers: {
          Authorization: `Bearer ${session.data?.user.accessToken}`,
        },
      });
      return res.data;
    },
  });

  const formProfile = useForm<z.infer<typeof formSchemaProfile>>({
    resolver: zodResolver(formSchemaProfile),
    defaultValues: {
      companyName: "",
      description: "",
      websiteUrl: "",
      industry: "",
      location: "",
      logoPath: undefined,
    },
  });

  const formChangePassword = useForm<z.infer<typeof formSchemaChangePassword>>({
    resolver: zodResolver(formSchemaChangePassword),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: updateProfileMutation, isPending: isUpdating } =
    useMutation({
      mutationFn: async (data: z.infer<typeof formSchemaProfile>) => {
        const formData = new FormData();

        if (data.companyName) formData.append("companyName", data.companyName);
        if (data.description) formData.append("description", data.description);
        if (data.websiteUrl) formData.append("websiteUrl", data.websiteUrl);
        if (data.industry) formData.append("industry", data.industry);
        if (data.location) formData.append("location", data.location);
        if (data.logoPath) formData.append("photo", data.logoPath);

        const res = await axiosInstance.patch(
          "/user/updateprofile/companyprofile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.data?.user.accessToken}`,
            },
          },
        );

        return res.data;
      },
      onSuccess: () => {
        toast.success("Update profile success");
        queryClient.invalidateQueries({ queryKey: ["profile-company"] });
        router.push("/company-profile");
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message ?? "Something went wrong!");
      },
    });
  async function onSubmit(data: z.infer<typeof formSchemaProfile>) {
    await updateProfileMutation(data);
  }

  type ChangePasswordPayload = {
    currentPassword: string;
    newPassword: string;
  };

  const { mutateAsync: changePassword, isPending: isChangingPassword } =
    useMutation({
      mutationFn: async (data: ChangePasswordPayload) => {
        const res = await axiosInstance.patch(
          "/user/updateprofile/change-password",
          data,
          {
            headers: {
              Authorization: `Bearer ${session.data?.user.accessToken}`,
            },
          },
        );

        return res.data;
      },
      onSuccess: () => {
        formChangePassword.reset();
        toast.success("Your password has been updated");
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(
          error.response?.data.message ?? "Failed to update password",
        );
      },
    });

  async function onSubmitChangePassword(
    values: z.infer<typeof formSchemaChangePassword>,
  ) {
    const { currentPassword, newPassword } = values;
    await changePassword({ currentPassword, newPassword });
  }

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-4xl space-y-12 px-6 pt-24 pb-12">
        <div className="text-center">
          <h1 className="font-heading text-foreground text-4xl font-bold">
            Update Company Profile
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Manage your company information
          </p>
        </div>

        {/* ============================== */}
        {/* PROFILE HEADER — data current  */}
        {/* ============================== */}
        {profile && (
          <div className="border-border bg-card flex items-center gap-5 rounded-xl border p-6 shadow-sm">
            {profile.logoPath ? (
              <Image
                src={profile.logoPath}
                alt="Profile"
                width={150}
                height={150}
              />
            ) : (
              <div className="bg-primary text-primary-foreground flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-bold">
                {profile.companyName?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}

            <div className="space-y-1">
              <h2 className="text-foreground text-xl font-bold">
                {profile.companyName || "Your Company"}
              </h2>

              <p className="text-muted-foreground flex items-center gap-1 text-sm">
                <Briefcase className="h-3.5 w-3.5" />
                {profile.industry || "Industry not set"}
              </p>

              <p className="text-muted-foreground flex items-center gap-1 text-sm">
                <TbFileDescription className="h-3.5 w-3.5" />
                {profile.description || "Industry not set"}
              </p>

              <p className="text-muted-foreground flex items-center gap-1 text-sm">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location || "Location not set"}
              </p>

              <p className="text-muted-foreground flex items-center gap-1 text-sm">
                <Globe className="h-3.5 w-3.5" />
                {profile.websiteUrl || "Website not set"}
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={formProfile.handleSubmit(onSubmit)}
          // className="max-w-xl space-y-6"
          className="border-border bg-card space-y-8 rounded-lg border p-8 shadow-sm"
        >
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-foreground text-2xl font-semibold">
                Company Information
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-[#5E3BEE] to-[#5E3BEE]" />
            </div>

            {/* NAME */}
            <Controller
              name="companyName"
              control={formProfile.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Company Name</FieldLabel>
                  <Input {...field} placeholder="Your company name" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="industry"
              control={formProfile.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Industry Field</FieldLabel>
                  <Input {...field} placeholder="Your company field" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="websiteUrl"
              control={formProfile.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Website</FieldLabel>
                  <Input {...field} placeholder="Your company website url" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={formProfile.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <textarea
                    {...field}
                    className="w-full rounded border px-3 py-2"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="location"
              control={formProfile.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Address</FieldLabel>
                  <textarea
                    {...field}
                    className="w-full rounded border px-3 py-2"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* PHOTO */}
            <Controller
              name="logoPath"
              control={formProfile.control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Company Photo</FieldLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      formProfile.setValue("logoPath", e.target.files?.[0])
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isUpdating}
            className="h-12 w-full rounded-lg bg-[#5E3BEE] font-semibold text-white shadow-md transition-all hover:bg-[#5E3BEE] hover:shadow-lg"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </Button>
        </form>

        {/* ====================== */}
        {/* CHANGE PASSWORD */}
        {/* ====================== */}

        <div>
          <h2 className="mb-6 text-xl font-semibold">Change Password</h2>

          <form
            onSubmit={formChangePassword.handleSubmit(onSubmitChangePassword)}
            // className="max-w-xl space-y-6"
            className="border-border bg-card space-y-8 rounded-lg border p-8 shadow-sm"
          >
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-foreground flex items-center gap-3 text-2xl font-semibold">
                  <Lock className="h-6 w-6 text-[#5E3BEE]" />
                  Change Password
                </h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-[#5E3BEE] to-[#5E3BEE]" />
              </div>

              <Controller
                name="currentPassword"
                control={formChangePassword.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Current Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Your current password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="newPassword"
                control={formChangePassword.control}
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
                control={formChangePassword.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirm New Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm your new password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isChangingPassword}
              className="h-12 w-full rounded-lg bg-[#5E3BEE] font-semibold text-white shadow-md transition-all hover:bg-[#5E3BEE] hover:shadow-lg"
            >
              {isChangingPassword ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default UpdateCompanyProfile;
