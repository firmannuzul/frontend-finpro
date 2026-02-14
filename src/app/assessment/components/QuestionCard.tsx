"use client";
import * as React from "react";
import { Question } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: number;
  onSelect: (optionId: string) => void;
}

export default function QuestionCard({ question, selectedOptionId, onSelect }: QuestionCardProps) {
  return (
    <Card className="border shadow-sm bg-white overflow-hidden rounded-xl">
      <CardHeader className="bg-slate-50/50 border-b p-6">
        <CardTitle className="text-xl font-semibold text-slate-800 leading-relaxed">
          {question.questionText}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <RadioGroup 
          value={selectedOptionId?.toString()} 
          onValueChange={onSelect}
          className="grid gap-4"
        >
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <Label
                key={option.id}
                htmlFor={`option-${option.id}`}
                className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 hover:bg-slate-50 ${
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <RadioGroupItem 
                  value={option.id.toString()} 
                  id={`option-${option.id}`} 
                  className="size-5"
                />
                <span className={`text-base flex-1 ${isSelected ? "text-primary font-medium" : "text-slate-600"}`}>
                  {option.optionText}
                </span>
              </Label>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}