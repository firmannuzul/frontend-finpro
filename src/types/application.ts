// src/types/application.ts

export interface Application {
  id: number;
  userId: number;
  jobPostingId: number;
  
  // Sesuai schema Application kamu
  cvFilePath: string; 
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "IN_REVIEW"; 
  preselectionScore: number | null;
  appliedAt: string;

  // Data User & Profil Pelamar
  applicant: {
    id: number;
    email: string;
    applicantProfile?: {
      name: string;
      photoPath?: string | null;
    } | null;
  };
}