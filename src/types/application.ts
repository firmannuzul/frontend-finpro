export interface Application {
  id: number;
  userId: number;
  jobPostingId: number;
  cvFilePath: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  lastEducation: string;
  expectedSalary: string;
  preselectionScore: string;
  status: string;
  rejectionReason: string;
  appliedAt: Date;
  jobPosting: {
    id: number;
    companyId: number;
    title: string;
    slug: string;
    experience: string;
    responsibility: string;
    requirement: string;
    category: string;
    location: string;
    salaryMin: string;
    salaryMax: string;
    description: string;
    thumbnail: string;
    hasPreselection: boolean;
    testPassingGrade: number;
    isPublished: boolean;
    postedAt: Date;
    deadlineAt: Date;
  };
  company: {
    id: number;
    userId: number;
    companyName: string;
    description: string;
    logoPath: null;
    websiteUrl: string;
    industry: string;
    location: string;
  };
}
