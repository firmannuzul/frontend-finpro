"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AssessmentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in duration-500">
      <Card className="max-w-md w-full border-none shadow-2xl bg-white/80 backdrop-blur-xl ring-1 ring-slate-200">
        <CardContent className="pt-10 pb-10 px-8 flex flex-col items-center text-center space-y-6">
          
          {/* Icon Animasi */}
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-green-100 p-4 rounded-full">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800">Assessment Tersimpan!</h2>
            <p className="text-slate-500">
              25 Soal telah berhasil dibuat dan siap digunakan untuk seleksi kandidat.
            </p>
          </div>

          <div className="flex flex-col w-full gap-3 pt-4">
            {/* Tombol Kembali - Pastikan href-nya sesuai dengan route list job kamu */}
            <Button asChild size="lg" className="w-full font-bold bg-[#6366f1] hover:bg-[#4f46e5]">
              <Link href="/dashboard/jobs">
                Kembali ke Daftar Lowongan
              </Link>
            </Button>
            
            <Button variant="ghost" className="text-slate-400 hover:text-slate-600">
              Review Soal (Segera Hadir)
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}