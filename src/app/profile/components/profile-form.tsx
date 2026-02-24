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
import { format } from "date-fns";
import { Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { CiCalendarDate } from "react-icons/ci";
import { toast } from "sonner";
import z from "zod";

const formSchemaProfile = z.object({
  name: z.string().optional(),

  gender: z.enum(["L", "P"]).optional(),

  // gender: z.enum(["MALE", "FEMALE"]).optional(),

  dob: z.string().optional(),

  phone: z.string().optional(),

  address: z.string().optional(),

  lastEducation: z.string().optional(),

  cvResumePath: z.instanceof(File).optional(),
  photoPath: z.instanceof(File).optional(),
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

const UpdateProfile = () => {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    // queryKey: ["profile"],
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosInstance.get("/user/profile", {
        // const res = await axiosInstance.get("/user/me/profile", {
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
      name: "",
      gender: undefined,
      // dob: "",
      dob: undefined,
      phone: "",
      address: "",
      lastEducation: "",
      cvResumePath: undefined,
      photoPath: undefined,
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

        if (data.name) formData.append("name", data.name);
        if (data.gender) formData.append("gender", data.gender);
        if (data.dob) {
          formData.append("dob", data.dob);
        }
        if (data.phone) formData.append("phone", data.phone);
        if (data.address) formData.append("address", data.address);
        if (data.lastEducation)
          formData.append("lastEducation", data.lastEducation);

        if (data.photoPath) formData.append("photo", data.photoPath);
        if (data.cvResumePath) formData.append("cv", data.cvResumePath);

        const res = await axiosInstance.patch("/user/updateprofile", formData, {
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        });

        return res.data;
      },
      onSuccess: () => {
        toast.success("Update profile success");
        // queryClient.invalidateQueries({ queryKey: ["profile"] });
        queryClient.invalidateQueries({ queryKey: ["me"] });
        router.push("/profile");
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
            Update Profile
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Manage your personal and professional information
          </p>
        </div>

        {profile && (
          <div className="border-border bg-card flex items-center gap-5 rounded-xl border p-6 shadow-sm">
            {/* Avatar */}
            {profile.photoPath ? (
              <Image
                src={profile.photoPath}
                alt="Profile"
                width={150}
                height={150}
              />
            ) : (
              <div className="bg-primary text-primary-foreground flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-bold">
                {profile.name?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}

            {/* Info */}
            <div className="space-y-1">
              <h2 className="text-foreground text-xl font-bold">
                {profile.name || "Your Name"}
              </h2>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <CiCalendarDate size={20} className="text-[#5E3BEE]" />
                <span>
                  {" "}
                  {profile?.dob
                    ? format(new Date(profile.dob), "dd MMM yyyy")
                    : "Date of birth not set"}
                </span>
              </p>

              <p className="text-muted-foreground text-sm">
                📞 {profile.phone || "Phone not set"}
              </p>

              <p className="text-muted-foreground text-sm">
                🎓 {profile.lastEducation || "Education not set"}
              </p>

              <p className="text-muted-foreground text-sm">
                📍 {profile.address || "Address not set"}
              </p>

              <p className="text-muted-foreground text-sm">
                <a
                  href={profile.cvResumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#5E3BEE] underline"
                >
                  View uploaded CV (PDF)
                </a>
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
                Personal Information
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-[#5E3BEE] to-[#5E3BEE]" />
            </div>
            {/* NAME */}

            <Controller
              name="name"
              control={formProfile.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input {...field} placeholder="Your full name" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* GENDER */}
            <Controller
              name="gender"
              control={formProfile.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Gender</FieldLabel>
                  <select
                    {...field}
                    className="w-full rounded border px-3 py-2"
                  >
                    <option value="">Select gender</option>
                    <option value="L">Male</option>
                    <option value="P">Female</option>
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* DOB */}
            <Controller
              name="dob"
              control={formProfile.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Date of Birth</FieldLabel>
                  <Input {...field} type="date" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* PHONE */}
            <Controller
              name="phone"
              control={formProfile.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Phone Number</FieldLabel>
                  <Input {...field} placeholder="08xxxxxxxxxx" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* ADDRESS */}
            <Controller
              name="address"
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

            {/* LAST EDUCATION */}
            <Controller
              name="lastEducation"
              control={formProfile.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Last Education</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Bachelor Degree in Computer Science"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* PHOTO */}
            <Controller
              name="photoPath"
              control={formProfile.control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Profile Photo</FieldLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      formProfile.setValue("photoPath", e.target.files?.[0])
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* CV */}
            <Controller
              name="cvResumePath"
              control={formProfile.control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>CV / Resume</FieldLabel>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      formProfile.setValue("cvResumePath", e.target.files?.[0])
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

export default UpdateProfile;
