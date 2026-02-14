"use client";
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QuestionCard from "@/app/assessment/components/QuestionCard";
import { Question, AnswerPayload } from "@/types/assessment";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, SendHorizontal, Timer as TimerIcon, Loader2 } from "lucide-react";

export default function AssessmentPage() {
  const { jobId } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [answers, setAnswers] = React.useState<AnswerPayload[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // --- LOGIC TIMER PERSISTEN ---
  const [timeLeft, setTimeLeft] = React.useState<number | null>(null);

  // 1. Inisialisasi Timer dari LocalStorage
  React.useEffect(() => {
    if (!jobId) return;
    const savedTime = localStorage.getItem(`timer_${jobId}`);
    const initialTime = savedTime ? parseInt(savedTime) : 30 * 60; // Default 30 menit
    setTimeLeft(initialTime);
  }, [jobId]);

  // 2. Jalankan Timer dan Simpan ke LocalStorage setiap detik
  React.useEffect(() => {
    if (timeLeft === null || timeLeft < 0) return;

    if (timeLeft === 0) {
      toast.error("Waktu habis! Mengirim jawaban otomatis...");
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const nextTime = prev !== null ? prev - 1 : 0;
        localStorage.setItem(`timer_${jobId}`, nextTime.toString());
        return nextTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, jobId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  // --- END TIMER ---

  React.useEffect(() => {
    const fetchQuestions = async () => {
      if (!jobId || !session?.user?.accessToken) return;
      try {
        const res = await axiosInstance.get(`/assessment/job/${jobId}`, {
          headers: { Authorization: `Bearer ${session.user.accessToken}` },
        });
        if (res.data.success) setQuestions(res.data.data);
      } catch (err: any) {
        toast.error("Gagal memuat materi tes");
      }
    };
    fetchQuestions();
  }, [jobId, session]);

  const handleSelect = (optionId: number) => {
    const qId = questions[currentIndex].id;
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== qId);
      return [...filtered, { questionId: qId, selectedOptionId: optionId }];
    });
  };

  const handleAutoSubmit = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (isSubmitting || !session?.user?.accessToken) return;
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post("/assessment/submit", 
        { jobId: Number(jobId), answers },
        { headers: { Authorization: `Bearer ${session.user.accessToken}` } }
      );
      if (res.data.success) {
        localStorage.removeItem(`timer_${jobId}`); // Hapus timer saat berhasil
        router.push(`/assessment/result?score=${res.data.data.score}&status=${res.data.data.status}`);
      }
    } catch (err: any) {
      toast.error("Gagal mengirim jawaban");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!questions.length || timeLeft === null) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FF]">
      <Loader2 className="h-10 w-10 text-[#6366f1] animate-spin" />
      <p className="mt-4 text-slate-500 font-medium tracking-tight">Menyiapkan Ruang Tes CMouse...</p>
    </div>
  );

  const currentAnswer = answers.find(a => a.questionId === questions[currentIndex].id);
  const isLastQuestion = currentIndex === questions.length - 1;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-[#F8F9FF] py-12 px-4 relative">
      {/* Timer Floating UI */}
      <div className="fixed top-6 right-6 z-50">
        <div className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-lg border-2 bg-white transition-all ${timeLeft < 300 ? "border-red-500 text-red-600 animate-pulse" : "border-indigo-100 text-[#6366f1]"}`}>
          <TimerIcon className="h-5 w-5" />
          <span className="text-lg font-black tracking-widest">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1 text-left">
              <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Progres Assessment</p>
              <h2 className="text-2xl font-bold text-slate-800">Soal {currentIndex + 1} <span className="text-slate-300 font-normal">/ {questions.length}</span></h2>
            </div>
            <p className="text-sm font-bold text-[#6366f1]">{Math.round(progress)}% Selesai</p>
          </div>
          <Progress value={progress} className="h-3 w-full bg-slate-100" />
        </div>

        {/* Question Area */}
        <div className="min-h-[400px]">
          <QuestionCard
            question={questions[currentIndex]}
            selectedOptionId={currentAnswer?.selectedOptionId}
            onSelect={(val) => handleSelect(parseInt(val))}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-dashed border-slate-200">
          <Button
            variant="ghost"
            className="text-slate-500 hover:text-slate-800 font-semibold px-6"
            onClick={() => setCurrentIndex(prev => prev - 1)}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Sebelumnya
          </Button>

          {isLastQuestion ? (
            <Button 
              className="bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-full px-12 py-7 text-lg font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95"
              onClick={handleSubmit}
              disabled={isSubmitting || answers.length < questions.length}
            >
              {isSubmitting ? "Mengirim..." : (
                <span className="flex items-center gap-2">Selesaikan Tes <SendHorizontal className="h-5 w-5" /></span>
              )}
            </Button>
          ) : (
            <Button 
              className="bg-[#0F172A] hover:bg-black text-white rounded-full px-12 py-7 text-lg font-bold shadow-lg transition-all active:scale-95"
              onClick={() => setCurrentIndex(prev => prev + 1)}
              disabled={!currentAnswer}
            >
              <span className="flex items-center gap-2">Selanjutnya <ArrowRight className="h-5 w-5" /></span>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}