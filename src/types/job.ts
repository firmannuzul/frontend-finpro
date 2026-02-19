export interface Job {
  id: number;
  companyId: number;
  title: string;
  slug: string;
  category: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
  description: string;
  experience: string;
  requirement: string;
  responsibility: string;
  thumbnail: string;
  hasPreselection: boolean;
  isPublished: boolean;
  postedAt: Date;
  deadlineAt: Date;
  company: {
    companyName: string;
  };
}
