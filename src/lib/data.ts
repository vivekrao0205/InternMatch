import type { Internship, Application, StudentProfile, ImagePlaceholder } from '@/types';
import placeholderData from './placeholder-images.json';

export const placeholderImages: ImagePlaceholder[] = placeholderData.placeholderImages;

export const internships: Internship[] = [
  {
    id: '1',
    title: 'Product Manager Intern',
    company: 'TechCorp',
    logoId: 'logo-techcorp',
    location: 'San Francisco, CA',
    description: 'Join our dynamic product team to work on cutting-edge features for our flagship product. You will be involved in the entire product lifecycle, from ideation to launch.',
    requiredSkills: ['Market Research', 'UI/UX Principles', 'Agile Methodologies'],
  },
  {
    id: '2',
    title: 'Associate Product Manager Intern',
    company: 'Innovate Inc.',
    logoId: 'logo-innovate',
    location: 'New York, NY',
    description: 'Assist in developing product roadmaps, defining feature requirements, and collaborating with engineering and design teams. A great opportunity to learn the ropes of product management.',
    requiredSkills: ['Data Analysis', 'User Stories', 'Roadmapping'],
  },
  {
    id: '3',
    title: 'Growth PM Intern',
    company: 'DataNex',
    logoId: 'logo-datanex',
    location: 'Remote',
    description: 'Focus on user acquisition and retention strategies. You will analyze user data to identify growth opportunities and run A/B tests to optimize funnels.',
    requiredSkills: ['A/B Testing', 'SQL', 'Growth Hacking'],
  },
  {
    id: '4',
    title: 'Technical Product Manager Intern',
    company: 'Synergy Solutions',
    logoId: 'logo-synergy',
    location: 'Austin, TX',
    description: 'Work closely with our engineering team on a highly technical product. A background in computer science or a related field is highly desirable.',
    requiredSkills: ['APIs', 'System Design', 'Agile Methodologies'],
  },
  {
    id: '5',
    title: 'AI Product Intern',
    company: 'QuantumLeap',
    logoId: 'logo-quantum',
    location: 'Boston, MA',
    description: 'Be part of the team building our next-generation AI platform. You will help define requirements for new machine learning models and features.',
    requiredSkills: ['Machine Learning', 'Data Analysis', 'Python'],
  },
  {
    id: '6',
    title: 'Mobile PM Intern',
    company: 'Pioneer Dynamics',
    logoId: 'logo-pioneer',
    location: 'Remote',
    description: 'Shape the future of our iOS and Android apps. You will be responsible for the mobile product roadmap and work with a dedicated mobile team.',
    requiredSkills: ['Mobile Analytics', 'UI/UX Principles', 'User Stories'],
  },
];

export const applications: Application[] = [
  {
    id: 'app1',
    studentId: 'user123',
    internship: internships[0],
    status: 'Under Review',
    appliedDate: '2024-07-15',
  },
  {
    id: 'app2',
    studentId: 'user123',
    internship: internships[2],
    status: 'Applied',
    appliedDate: '2024-07-20',
  },
    {
    id: 'app3',
    studentId: 'user123',
    internship: internships[4],
    status: 'Interview',
    appliedDate: '2024-07-10',
  },
];

export const studentProfile: StudentProfile = {
    id: 'user123',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    skills: ['Data Analysis', 'Market Research', 'Agile Methodologies', 'UI/UX Principles', 'SQL'],
    qualifications: 'Currently pursuing a Master\'s in Computer Science with a focus on Human-Computer Interaction. Completed several projects on product design and market analysis. Strong analytical and problem-solving skills.',
    preferences: 'Interested in B2C products, preferably in the fintech or ed-tech sectors. Open to remote or hybrid roles in major tech hubs like San Francisco or New York.'
}
