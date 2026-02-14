"use client";
import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Frown, LayoutDashboard, Briefcase, Loader2 } from "lucide-react";

export default function AssessmentResultPage() {
  const { data: session, status } = useSession(); // Digunakan untuk proteksi halaman
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = searchParams.get("score");
  const resultStatus = searchParams.get("status"); 
  const isPassed = resultStatus === "PASSED" || Number(score) >= 70;

  // 1. Menangani loading session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-[#6366f1] animate-spin" />
      </div>
    );
  }

  // 2. Proteksi Halaman: Jika tidak login, arahkan ke login
  if (!session) {
    return (
      <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border space-y-4">
          <p className="text-slate-600 font-medium">Sesi tidak ditemukan. Silakan login kembali.</p>
          <Button 
            className="bg-[#6366f1] hover:bg-[#4f46e5]" 
            onClick={() => router.push("/login")}
          >
            Ke Halaman Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9FF] flex items-center justify-center p-6">
      <Card className="max-w-xl w-full border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[32px] overflow-hidden bg-white">
        
        {/* Banner Section - Tanpa Nama User */}
        <div className={`py-14 text-center ${isPassed ? "bg-[#EEF2FF]" : "bg-slate-50"}`}>
          <div className="flex justify-center mb-6">
            <div className={`p-6 rounded-full ${isPassed ? "bg-white text-[#6366f1]" : "bg-white text-slate-400"} shadow-sm`}>
              {isPassed ? (
                <Trophy className="h-16 w-16 animate-bounce" />
              ) : (
                <Frown className="h-16 w-16" />
              )}
            </div>
          </div>
          <CardTitle className="text-3xl font-black text-[#0F172A] mb-2 px-4 leading-tight">
            {isPassed ? "Selamat! Kamu Lulus" : "Tetap Semangat!"}
          </CardTitle>
          <p className="text-slate-500 font-medium px-8 mt-2">
            {isPassed 
              ? "Kamu telah menyelesaikan tantangan dengan hasil yang memuaskan." 
              : "Hasil ini belum mencapai ambang batas minimum."}
          </p>
        </div>

        {/* Score Breakdown */}
        <CardContent className="p-10 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#6366f1]">Performa Akhir</span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-8xl font-black text-[#0F172A] tracking-tighter">{score || 0}</span>
              <span className="text-2xl font-bold text-slate-300">/100</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
            <div className={`p-2 rounded-lg shrink-0 ${isPassed ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
               <Briefcase className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium text-left">
              {isPassed 
                ? "Lamaranmu telah diterima. Tim rekrutmen akan meninjau hasil tes ini segera." 
                : "Jangan berkecil hati, kamu bisa mencoba melamar di lowongan lain yang tersedia."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button 
              className="bg-[#6366f1] hover:bg-[#4f46e5] h-14 rounded-2xl font-bold text-white shadow-lg shadow-indigo-100 transition-all active:scale-95"
              onClick={() => router.push("/dashboard")}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" /> Ke Dashboard
            </Button>
            <Button 
              variant="outline" 
              className="h-14 rounded-2xl border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
              onClick={() => router.push("/jobs")}
            >
              Cari Lowongan
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}