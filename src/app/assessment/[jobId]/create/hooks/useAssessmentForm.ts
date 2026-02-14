"use client";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";
import { createAssessmentSchema, CreateAssessmentFormValues } from "@/lib/validators/assessment";

export const useAssessmentForm = (jobId: number) => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // State baru

  const form = useForm<CreateAssessmentFormValues>({
    resolver: zodResolver(createAssessmentSchema),
    defaultValues: { jobId, questions: [] },
  });

  const { fields } = useFieldArray({ control: form.control, name: "questions" });

  const initializeQuestions = () => {
    if (fields.length > 0) return;
    const emptyQuestions = Array.from({ length: 25 }).map(() => ({
      questionText: "",
      options: [
        { optionText: "", isCorrect: true },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
      ],
    }));
    form.reset({ jobId, questions: emptyQuestions });
  };

  useEffect(() => initializeQuestions(), [jobId]);

  const submitToApi = async (data: CreateAssessmentFormValues) => {
    if (!session?.user?.accessToken) return;
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/assessment/create", data, {
        headers: { Authorization: `Bearer ${session.user.accessToken}` },
      });
      // PENTING: Jangan redirect otomatis. Set success state saja.
      setIsSuccess(true);
      toast.success("Assessment berhasil disimpan!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal menyimpan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, fields, isSubmitting, isSuccess, onSubmit: form.handleSubmit(submitToApi) };
};