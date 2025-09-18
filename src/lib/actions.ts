'use server';

import { aiInternshipMatching } from '@/ai/flows/ai-internship-matching';
import { studentProfile, internships } from './data';
import { StudentProfile, Internship } from '@/types';

function formatStudentProfile(profile: StudentProfile): string {
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

export async function getInternshipRecommendations() {
  // In a real app, you would fetch the current user's profile and available internships
  const studentProfileString = formatStudentProfile(studentProfile);
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
