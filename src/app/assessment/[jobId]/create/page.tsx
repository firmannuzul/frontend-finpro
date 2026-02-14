"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { useAssessmentForm } from "./hooks/useAssessmentForm";
import { AssessmentHeader } from "./components/AssessmentHeader";
import QuestionCard from "./components/QuestionCard";
import AssessmentSuccess from "./components/AssessmentSuccess";

export default function CreateAssessmentPage() {
  const { jobId } = useParams();
  // Ambil state isSuccess dari hook
  const { form, fields, isSubmitting, isSuccess, onSubmit } = useAssessmentForm(Number(jobId));

  // KONDISI: Jika sukses, ganti seluruh tampilan form dengan tampilan sukses
  if (isSuccess) {
    return (
        <main className="container max-w-5xl mx-auto py-12">
            <AssessmentSuccess />
        </main>
    );
  }

  return (
    <main className="container max-w-5xl mx-auto py-12 pb-40 space-y-8">
      <AssessmentHeader filledCount={fields.length} />

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-6">
          {fields.map((field, index) => (
            <QuestionCard key={field.id} index={index} form={form} />
          ))}
        </div>
        
        <SubmitAction isSubmitting={isSubmitting} isValid={fields.length === 25} />
      </form>
    </main>
  );
}

// ... (SubmitAction component tetap sama di bawah)
function SubmitAction({ isSubmitting, isValid }: { isSubmitting: boolean; isValid: boolean }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center z-50 pointer-events-none">
      <div className="bg-[#0F172A]/90 backdrop-blur-xl p-3 pr-4 rounded-full shadow-2xl border border-slate-700/50 flex items-center gap-6 pointer-events-auto transform hover:scale-[1.02] transition-all duration-300">
        
        <div className="pl-4 text-sm font-medium text-slate-300 hidden md:block">
           {isValid ? "Semua soal telah terisi ✨" : "Lengkapi 25 soal untuk menyimpan"}
        </div>

        <Button 
          type="submit" 
          size="lg" 
          disabled={isSubmitting || !isValid}
          className={`rounded-full px-8 h-12 font-bold text-base transition-all ${
            isValid 
              ? "bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              : "bg-slate-700 text-slate-500 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Menyimpan...</span>
          ) : (
            <span className="flex items-center gap-2">Simpan Assessment <Save className="w-4 h-4" /></span>
          )}
        </Button>
      </div>
    </div>
  );
}