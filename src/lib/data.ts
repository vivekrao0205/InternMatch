
import type { Internship, Application, StudentProfile, ImagePlaceholder } from '@/types';
import placeholderData from './placeholder-images.json';

export const placeholderImages: ImagePlaceholder[] = placeholderData.placeholderImages;

export const internships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern (AI/ML)',
    company: 'Reliance Industries',
    logoId: 'logo-reliance',
    location: 'Mumbai, MH',
    description: 'Work on cutting-edge AI and machine learning projects within a dynamic team. This role involves developing and deploying scalable software solutions that leverage our cloud infrastructure.',
    requiredSkills: ['Data analysis', 'Cloud computing', 'AI', 'Software dev', 'Python'],
    salary: '₹50,000 - ₹70,000 /month'
  },
  {
    id: '2',
    title: 'IT Services Intern',
    company: 'Tata Consultancy Services (TCS)',
    logoId: 'logo-tcs',
    location: 'Bangalore, KA',
    description: 'Gain experience in a leading IT services company. You will contribute to live projects, utilizing skills in Java, Python, and cloud platforms to deliver robust solutions for global clients.',
    requiredSkills: ['Java', 'Python', 'cloud', 'DevOps', 'AI/ML', 'web dev'],
    salary: '₹45,000 - ₹65,000 /month'
  },
  {
    id: '3',
    title: 'Financial Data Analyst Intern',
    company: 'HDFC Bank',
    logoId: 'logo-hdfc',
    location: 'Mumbai, MH',
    description: 'Join our finance analytics team to work on data-driven projects. You will use Python and data analytics tools to provide insights and support our cybersecurity and cloud initiatives.',
    requiredSkills: ['Python', 'data analytics', 'cybersecurity', 'cloud'],
    salary: '₹55,000 - ₹75,000 /month'
  },
  {
    id: '4',
    title: 'Cloud Engineering Intern',
    company: 'Infosys',
    logoId: 'logo-infosys',
    location: 'Pune, MH',
    description: 'An exciting opportunity to work with our cloud services team. You will be involved in Agile development cycles, helping to build and maintain cloud infrastructure using modern DevOps practices.',
    requiredSkills: ['Java', 'Python', 'AI', 'cloud', 'Agile', 'DevOps'],
    salary: '₹40,000 - ₹60,000 /month'
  },
  {
    id: '5',
    title: 'AI/ML Engineering Intern',
    company: 'Wipro',
    logoId: 'logo-wipro',
    location: 'Bangalore, KA',
    description: 'Be part of our AI innovation lab. This internship focuses on developing and testing new AI/ML models. Proficiency in Python and JavaScript is required.',
    requiredSkills: ['Cloud', 'AI/ML', 'Python', 'JavaScript', 'Agile'],
    salary: '₹50,000 - ₹70,000 /month'
  },
  {
    id: '6',
    title: 'Digital Banking Intern',
    company: 'ICICI Bank',
    logoId: 'logo-icici',
    location: 'Remote',
    description: 'Contribute to our digital banking platform. You will work on software development projects using Python and cloud technologies to enhance our customer experience.',
    requiredSkills: ['Python', 'data analytics', 'software dev', 'cloud'],
    salary: '₹50,000 - ₹65,000 /month'
  },
  {
    id: '7',
    title: 'Network and Cloud Intern',
    company: 'Bharti Airtel',
    logoId: 'logo-airtel',
    location: 'Gurgaon, HR',
    description: 'Join our network infrastructure team to manage and optimize our telecom services. Experience with cloud infrastructure and Python is essential for this role.',
    requiredSkills: ['Network management', 'cloud infrastructure', 'Python'],
    salary: '₹45,000 - ₹60,000 /month'
  },
  {
    id: '8',
    title: 'Construction Tech Intern',
    company: 'Larsen & Toubro',
    logoId: 'logo-lt',
    location: 'Chennai, TN',
    description: 'Explore the intersection of technology and construction. This role involves project management and implementing IoT and automation solutions on major engineering projects.',
    requiredSkills: ['Project management', 'IoT', 'automation'],
    salary: '₹40,000 - ₹55,000 /month'
  },
  {
    id: '9',
    title: 'Cloud Solutions Intern',
    company: 'HCL Technologies',
    logoId: 'logo-hcl',
    location: 'Noida, UP',
    description: 'Work with our cloud computing team to design and implement solutions for clients. This role requires knowledge of RPA, Python, and Java.',
    requiredSkills: ['Cloud computing', 'RPA', 'Python', 'Java'],
    salary: '₹45,000 - ₹65,000 /month'
  },
  {
    id: '10',
    title: 'Data Analytics Intern',
    company: 'Adani Group',
    logoId: 'logo-adani',
    location: 'Ahmedabad, GJ',
    description: 'Join a diversified conglomerate and contribute to data-driven decision-making. This role involves data analytics and project management across various business verticals.',
    requiredSkills: ['Data analytics', 'project management'],
    salary: '₹50,000 - ₹70,000 /month'
  },
  {
    id: '11',
    title: 'Cybersecurity Intern',
    company: 'Axis Bank',
    logoId: 'logo-axis',
    location: 'Mumbai, MH',
    description: 'A role within our security team to protect banking systems. Requires knowledge of Python, security protocols, and AI-driven threat analysis.',
    requiredSkills: ['Python', 'security', 'analytics', 'AI'],
    salary: '₹60,000 - ₹80,000 /month'
  },
  {
    id: '12',
    title: 'Automotive IoT Intern',
    company: 'Maruti Suzuki',
    logoId: 'logo-maruti',
    location: 'Gurgaon, HR',
    description: 'Work on connected car technologies. This internship involves developing IoT solutions and embedded systems for our next-generation vehicles.',
    requiredSkills: ['IoT', 'embedded systems', 'Python', 'process automation'],
    salary: '₹45,000 - ₹60,000 /month'
  },
  {
    id: '13',
    title: 'Farm Equipment Tech Intern',
    company: 'Mahindra & Mahindra',
    logoId: 'logo-mahindra',
    location: 'Mumbai, MH',
    description: 'Innovate in the agri-tech space by working on embedded systems, IoT, and machine learning solutions for our farm equipment division.',
    requiredSkills: ['Embedded systems', 'IoT', 'machine learning'],
    salary: '₹45,000 - ₹65,000 /month'
  },
  {
    id: '14',
    title: 'Fintech Data Science Intern',
    company: 'Bajaj Finance',
    logoId: 'logo-bajaj',
    location: 'Pune, MH',
    description: 'Utilize your data science skills in the financial services sector. This role involves working with Python and cloud infrastructure to build predictive models.',
    requiredSkills: ['Python', 'data science', 'cloud infrastructure'],
    salary: '₹55,000 - ₹75,000 /month'
  },
  {
    id: '15',
    title: 'Telecom AI Intern',
    company: 'Tech Mahindra',
    logoId: 'logo-techm',
    location: 'Pune, MH',
    description: 'A role focused on applying AI/ML to the telecom industry. You will work on projects related to network optimization and security.',
    requiredSkills: ['Cloud computing', 'AI/ML', 'Python', 'security'],
    salary: '₹50,000 - ₹70,000 /month'
  },
  {
    id: '16',
    title: 'Cloud Engineering Intern',
    company: 'Mindtree',
    logoId: 'logo-mindtree',
    location: 'Hyderabad, TS',
    description: 'Join our team in Hyderabad to work on cutting-edge cloud solutions. This internship provides hands-on experience with major cloud platforms and DevOps practices.',
    requiredSkills: ['Cloud', 'Java', 'AI/ML', 'DevOps'],
    salary: '₹50,000 - ₹65,000 /month'
  }
];

export let applications: Application[] = [
  {
    id: 'app1',
    studentId: 'user123',
    internship: internships[0], // Reliance
    status: 'Under Review',
    appliedDate: '2024-07-15',
  },
  {
    id: 'app2',
    studentId: 'user123',
    internship: internships[2], // HDFC
    status: 'Applied',
    appliedDate: '2024-07-20',
  },
  {
    id: 'app3',
    studentId: 'user123',
    internship: internships[4], // Wipro
    status: 'Interview',
    appliedDate: '2024-07-10',
  },
];

export let studentProfile: StudentProfile = {
    id: 'user123',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    skills: ['Data Analysis', 'Market Research', 'Agile Methodologies', 'UI/UX Principles', 'SQL', 'Python'],
    qualifications: 'Currently pursuing a B.Tech in Computer Science from a top Indian university. Completed several projects on product design and market analysis. Strong analytical and problem-solving skills.',
    preferences: 'Interested in B2C products, preferably in the fintech or e-commerce sectors. Open to remote or hybrid roles in major tech hubs like Bangalore or Mumbai.',
    expectedSalary: '₹60,000 /month'
}

    
