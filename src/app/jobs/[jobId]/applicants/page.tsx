"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { axiosInstance } from "@/lib/axios";
import { Application } from "@/types/application";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, MoreHorizontal } from "lucide-react";

export default function ApplicantsPage() {
  const { jobId } = useParams();
  const { data: session } = useSession();
  
  const [applicants, setApplicants] = React.useState<Application[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch Data Pelamar
  React.useEffect(() => {
    const fetchApplicants = async () => {
      if (!session?.user?.accessToken) return;
      try {
        const response = await axiosInstance.get(`/applications/job/${jobId}`, {
          headers: { Authorization: `Bearer ${session.user.accessToken}` },
        });
        setApplicants(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data pelamar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId, session]);

  // Helper untuk Warna Badge Skor
  const getScoreBadge = (score: number | null) => {
    if (score === null) return <Badge variant="outline" className="text-slate-500">Belum Tes</Badge>;
    if (score >= 70) return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">{score} / 100 (Lulus)</Badge>;
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">{score} / 100 (Gagal)</Badge>;
  };

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  }

  return (
    <main className="container mx-auto py-10 space-y-8 max-w-6xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kandidat Pelamar</h1>
          <p className="text-muted-foreground">
            Total {applicants.length} pelamar untuk posisi ini.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Hasil Seleksi</CardTitle>
        </CardHeader>
        <CardContent>
          {applicants.length === 0 ? (
            <div className="text-center py-10 text-slate-500">Belum ada pelamar masuk.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kandidat</TableHead>
                  <TableHead>Tanggal Melamar</TableHead>
                  <TableHead>Skor Assessment</TableHead>
                  <TableHead>Status Lamaran</TableHead>
                  <TableHead className="text-right">CV / Resume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {applicants.map((app) => {
                // AKSES DATA YANG AMAN (Safe Access)
                // Kita ambil profile dari dalam object applicant
                const profile = app.applicant.applicantProfile;
                
                // Fallback jika profile belum diisi user
                const name = profile?.name || "Tanpa Nama"; 
                const photo = profile?.photoPath || ""; // Sesuai schema: photoPath
                const email = app.applicant.email;

                return (
                  <TableRow key={app.id}>
                    {/* Kolom 1: Info Kandidat */}
                    <TableCell className="flex items-center gap-3">
                      <Avatar>
                        {/* Tampilkan foto jika ada */}
                        <AvatarImage src={photo ? `/uploads/${photo}` : ""} />
                        <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold">{name}</span>
                        <span className="text-xs text-muted-foreground">{email}</span>
                      </div>
                    </TableCell>
                    
                    {/* Kolom 2: Tanggal */}
                    <TableCell>
                      {format(new Date(app.appliedAt), "dd MMM yyyy", { locale: id })}
                    </TableCell>

                    {/* Kolom 3: Skor Assessment */}
                    <TableCell>
                      {getScoreBadge(app.preselectionScore)}
                    </TableCell>

                    {/* Kolom 4: Status */}
                    <TableCell>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        app.status === 'REJECTED' ? 'bg-red-50 text-red-600' :
                        app.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {app.status}
                      </span>
                    </TableCell>

                    {/* Kolom 5: Download CV */}
                    <TableCell className="text-right">
                       {/* Gunakan cvFilePath dari tabel Application */}
                       {app.cvFilePath ? (
                         <Button variant="outline" size="sm" asChild>
                           {/* Pastikan path public URL sesuai folder upload kamu */}
                           <a href={`/uploads/${app.cvFilePath}`} target="_blank" rel="noopener noreferrer">
                             <FileText className="w-4 h-4 mr-2" /> Lihat CV
                           </a>
                         </Button>
                       ) : (
                         <span className="text-xs text-slate-400">Tidak ada CV</span>
                       )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}