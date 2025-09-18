'use server';

import { aiInternshipMatching } from '@/ai/flows/ai-internship-matching';
import { studentProfile, internships } from './data';
import { StudentProfile, Internship } from '@/types';

function formatStudentProfile(profile: Omit<StudentProfile, 'id' | 'email'>): string {
  return `
- Name: ${profile.name}
- Skills: ${profile.skills.join(', ')}
- Qualifications: ${profile.qualifications}
- Preferences: ${profile.preferences}
  `.trim();
}

function formatInternshipList(list: Internship[]): string {
  return list.map(internship => `
- Internship Title: ${internship.title}
- Company: ${internship.company}
- Location: ${internship.location}
- Description: ${internship.description}
- Required Skills: ${internship.requiredSkills.join(', ')}
  `.trim()).join('\n\n');
}

export async function getInternshipRecommendations(skills: string) {
  // In a real app, you would fetch the current user's profile
  // For now, we create a dynamic profile based on the input skills
  const dynamicProfile = {
    ...studentProfile,
    skills: skills.split(',').map(s => s.trim()).filter(Boolean),
  };
  
  const studentProfileString = formatStudentProfile(dynamicProfile);
  const internshipListString = formatInternshipList(internships);

  try {
    const result = await aiInternshipMatching({
      studentProfile: studentProfileString,
      internshipList: internshipListString,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    return { success: false, error: 'Failed to generate recommendations. Please try again later.' };
  }
}
