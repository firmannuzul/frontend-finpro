import { CardTitle } from "@/components/ui/card";

interface HeaderProps {
  filledCount: number;
}

export function AssessmentHeader({ filledCount }: HeaderProps) {
  return (
    <div className="flex justify-between items-end mb-10">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-[#0F172A]">Buat Assessment</h1>
        <p className="text-slate-500 mt-2 text-lg">Rancang tes seleksi untuk kandidat terbaik.</p>
      </div>
      <div className="text-right bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-3xl font-black text-[#6366f1]">{filledCount} <span className="text-slate-300 text-xl font-bold">/ 25</span></p>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Soal Terisi</p>
      </div>
    </div>
  );
}

export function QuestionHeader({ index, isOpen }: { index: number; isOpen: boolean }) {
  return (
    <CardTitle className={`text-base font-bold flex items-center gap-3 ${isOpen ? "text-[#6366f1]" : "text-slate-700"}`}>
      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
        isOpen ? "bg-[#6366f1] text-white shadow-md" : "bg-slate-100 text-slate-500"
      }`}>
        {index + 1}
      </span>
      <span className="tracking-tight">Pertanyaan Nomor {index + 1}</span>
    </CardTitle>
  );
}