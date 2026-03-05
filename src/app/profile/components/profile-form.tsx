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

/* ========================= */
/* SCHEMA */
/* ========================= */

const formSchemaProfile = z.object({
  name: z.string().optional(),
  gender: z.enum(["L", "P"]).optional(),
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
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosInstance.get("/user/profile", {
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
        if (data.dob) formData.append("dob", data.dob);
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
        queryClient.invalidateQueries({ queryKey: ["me"] });
        router.push("/profile");
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message ?? "Something went wrong!");
      },
    });

  const onSubmitProfile = async (data: z.infer<typeof formSchemaProfile>) => {
    await updateProfileMutation(data);
  };

  const { mutateAsync: changePassword, isPending: isChangingPassword } =
    useMutation({
      mutationFn: async (data: {
        currentPassword: string;
        newPassword: string;
      }) => {
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
        toast.success("Your password has been updated");
        formChangePassword.reset();
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(
          error.response?.data.message ?? "Failed to update password",
        );
      },
    });

  const onSubmitPassword = async (
    data: z.infer<typeof formSchemaChangePassword>,
  ) => {
    await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 pt-24 pb-16">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="font-heading text-foreground text-4xl font-bold">
            Update Profile
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Manage your personal and professional information
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="space-y-6">
            {profile && (
              <>
                <div className="bg-card border-border rounded-2xl border p-6 text-center shadow-sm">
                  {profile.photoPath ? (
                    <Image
                      src={profile.photoPath}
                      alt="Profile"
                      width={112}
                      height={112}
                      className="ring-primary/20 mx-auto h-28 w-28 rounded-full object-cover ring-4"
                    />
                  ) : (
                    <div className="bg-primary text-primary-foreground ring-primary/20 mx-auto flex h-28 w-28 items-center justify-center rounded-full text-4xl font-bold ring-4">
                      {profile.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                  )}
                  <h2 className="text-foreground mt-4 text-lg font-bold">
                    {profile.name || "Your Name"}
                  </h2>
                  {profile.cvResumePath && (
                    <a
                      href={profile.cvResumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-[#5E3BEE] hover:underline"
                    >
                      📄 View Uploaded CV
                    </a>
                  )}
                </div>

                <div className="bg-card border-border rounded-2xl border p-6 shadow-sm">
                  <h3 className="text-foreground mb-4 text-sm font-semibold">
                    Information
                  </h3>
                  <div className="text-muted-foreground space-y-3 text-sm">
                    <div>
                      <CiCalendarDate className="mr-2 inline" size={16} />
                      {profile?.dob
                        ? format(new Date(profile.dob), "dd MMM yyyy")
                        : "Date of birth not set"}
                    </div>
                    <div>📞 {profile.phone || "Phone not set"}</div>
                    <div>🎓 {profile.lastEducation || "Education not set"}</div>
                    <div>📍 {profile.address || "Address not set"}</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="space-y-8">
            {/* PERSONAL INFO FORM */}
            <form
              onSubmit={formProfile.handleSubmit(onSubmitProfile)}
              className="bg-card border-border space-y-8 rounded-lg border p-8 shadow-sm"
            >
              <div>
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  Personal Information
                </h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-[#5E3BEE]" />
              </div>

              {/* --- ALL YOUR EXISTING FIELDS BELOW (UNCHANGED) --- */}

              {/* grid name gender dob phone */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* NAME */}
                <Controller
                  name="name"
                  control={formProfile.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Full Name</FieldLabel>
                      <Input {...field} placeholder="Full name" />
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
              </div>

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
                      placeholder="Address"
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

              {/* PHOTO + CV */}
              <div className="grid gap-6 sm:grid-cols-2">
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
                          formProfile.setValue(
                            "cvResumePath",
                            e.target.files?.[0],
                          )
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
                className="h-12 w-full cursor-pointer rounded-lg bg-[#5E3BEE] font-semibold text-white"
              >
                {isUpdating ? "Updating..." : "Update Profile"}
              </Button>
            </form>

            {/* CHANGE PASSWORD (UNCHANGED) */}
            <form
              onSubmit={formChangePassword.handleSubmit(onSubmitPassword)}
              className="bg-card border-border space-y-8 rounded-lg border p-8 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-[#5E3BEE]" />
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  Change Password
                </h2>
              </div>

              {/* same password fields */}
              <Controller
                name="currentPassword"
                control={formChangePassword.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Current Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Current password"
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
                    <FieldLabel>Confirm Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm new password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                disabled={isChangingPassword}
                className="h-12 w-full cursor-pointer rounded-lg bg-[#5E3BEE] font-semibold text-white"
              >
                {isChangingPassword ? "Updating..." : "Change Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default UpdateProfile;
