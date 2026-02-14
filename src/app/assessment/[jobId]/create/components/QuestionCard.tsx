"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react"; // Tambah icon CheckCircle2
import { QuestionHeader } from "./AssessmentHeader";

interface QuestionCardProps {
  index: number;
  form: UseFormReturn<any>;
}

export default function QuestionCard({ index, form }: QuestionCardProps) {
  const { register, setValue, getValues, watch, formState: { errors } } = form;
  
  const [isOpen, setIsOpen] = useState(index === 0);

  const errorMsg = (errors.questions as any)?.[index]?.questionText?.message as string | undefined;
  const questionTextValue = watch(`questions.${index}.questionText`);

  // Logic Set Correct Answer yang LEBIH RESPONSIF
  const handleSetCorrect = (optIndex: number) => {
    const currentOptions = getValues(`questions.${index}.options`);
    
    const newOptions = currentOptions.map((o: any, i: number) => ({
      ...o,
      isCorrect: i === optIndex,
    }));
    
    // PENTING: shouldValidate & shouldDirty memaksa UI update seketika
    setValue(`questions.${index}.options`, newOptions, { 
      shouldValidate: true, 
      shouldDirty: true 
    });
  };

  return (
    <Card 
      className={`transition-all duration-300 border-l-4 overflow-hidden ${
        isOpen 
          ? "border-l-[#6366f1] shadow-lg ring-1 ring-slate-100" 
          : "border-l-slate-200 shadow-sm opacity-90 hover:opacity-100"
      }`}
    >
      <CardHeader 
        className={`py-4 cursor-pointer select-none flex flex-row items-center justify-between transition-colors ${
          isOpen ? "bg-[#EEF2FF]" : "bg-white hover:bg-slate-50"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-1 w-full pr-4">
          <QuestionHeader index={index} isOpen={isOpen} />
          {!isOpen && (
            <p className="text-sm text-slate-500 truncate max-w-lg ml-10 font-medium">
              {questionTextValue || "Klik untuk mengisi pertanyaan..."}
            </p>
          )}
        </div>
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-[#6366f1] shrink-0">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="pt-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
          <div className="space-y-3">
            <Label className="text-slate-700 font-semibold">Teks Pertanyaan</Label>
            <Input
              {...register(`questions.${index}.questionText`)}
              placeholder="Contoh: Apa keunggulan utama menggunakan Next.js?"
              className={`h-12 text-base px-4 border-slate-200 focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] ${
                errorMsg ? "border-red-500 bg-red-50" : "bg-white"
              }`}
            />
            {errorMsg && <p className="text-xs text-red-500 font-bold ml-1">{errorMsg}</p>}
          </div>

          <div className="bg-[#F8F9FF] p-6 rounded-2xl border border-indigo-50/50 space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-bold uppercase tracking-wider text-[#6366f1]">
                Pilihan Jawaban & Kunci
              </Label>
              <span className="text-[10px] text-slate-400 bg-white px-2 py-1 rounded-full border">
                Klik huruf A-D untuk set jawaban benar
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((optIdx) => (
                <OptionRow 
                    key={optIdx} 
                    qIndex={index} 
                    optIndex={optIdx} 
                    form={form} 
                    onSelect={() => handleSetCorrect(optIdx)} 
                />
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// Sub-Component OptionRow yang sudah di-fix UX-nya
function OptionRow({ qIndex, optIndex, form, onSelect }: { qIndex: number; optIndex: number; form: any; onSelect: () => void }) {
    // Gunakan form.watch agar re-render realtime saat nilai berubah
    const isCorrect = form.watch(`questions.${qIndex}.options.${optIndex}.isCorrect`);
    const labels = ["A", "B", "C", "D"];

    return (
        <div 
          className={`relative flex items-center gap-3 p-2 pr-4 rounded-xl border-2 transition-all duration-200 group ${
            isCorrect 
              ? "bg-white border-[#6366f1] shadow-[0_4px_12px_rgba(99,102,241,0.15)] z-10" 
              : "bg-white border-slate-100 hover:border-slate-300"
          }`}
        >
            {/* Tombol Pemilih Kunci Jawaban (Dibuat terpisah sebagai Button) */}
            <button
                type="button" // PENTING: type button agar tidak submit form
                onClick={(e) => {
                  e.preventDefault(); // Mencegah bubbling event
                  onSelect();
                }}
                title="Jadikan Kunci Jawaban"
                className={`shrink-0 w-10 h-10 rounded-lg cursor-pointer flex items-center justify-center transition-all font-black text-sm outline-none focus:scale-105 active:scale-95 ${
                  isCorrect 
                    ? "bg-[#6366f1] text-white shadow-md" 
                    : "bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-[#6366f1]"
                }`}
            >
                {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : labels[optIndex]}
            </button>

            {/* Input Text Jawaban */}
            <Input 
                {...form.register(`questions.${qIndex}.options.${optIndex}.optionText`)} 
                placeholder={`Isi Jawaban ${labels[optIndex]}...`} 
                className={`flex-1 border-none shadow-none focus-visible:ring-0 px-2 h-auto font-medium text-slate-700 placeholder:text-slate-300 bg-transparent ${isCorrect ? "font-semibold" : ""}`}
            />
            
            {/* Visual Indicator Tambahan jika dipilih */}
            {isCorrect && (
              <div className="absolute top-0 right-0 -mt-2 -mr-2 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#6366f1]"></span>
              </div>
            )}
        </div>
    )
}