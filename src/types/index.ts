export type StudentProfile = {
  id: string;
  name: string;
  email: string;
  skills: string[];
  qualifications: string;
  preferences: string;
};

export type Internship = {
  id: string;
  title: string;
  company: string;
  logoId: string;
  location: string;
  description: string;
  requiredSkills: string[];
};

export type Application = {
  id: string;
  internship: Internship;
  studentId: string;
  status: 'Applied' | 'Under Review' | 'Interview' | 'Offered' | 'Rejected';
  appliedDate: string;
};

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};
