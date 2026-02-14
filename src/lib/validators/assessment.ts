import { z } from "zod";

export const optionSchema = z.object({
  optionText: z.string().min(1, "Opsi jawaban tidak boleh kosong"),
  isCorrect: z.boolean(),
});

export const questionSchema = z.object({
  questionText: z.string().min(5, "Pertanyaan minimal 5 karakter"),
  options: z.array(optionSchema).min(2, "Minimal 2 pilihan jawaban"),
});

export const createAssessmentSchema = z.object({
  jobId: z.number(),
  questions: z
    .array(questionSchema)
    .min(25, "Wajib membuat tepat 25 soal")
    .max(25, "Maksimal 25 soal"),
});

export type CreateAssessmentFormValues = z.infer<typeof createAssessmentSchema>;