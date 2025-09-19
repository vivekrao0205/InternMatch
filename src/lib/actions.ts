'use server';

import { studentProfile, internships } from './data';
import { StudentProfile, Internship } from '@/types';
import { aiInternshipMatching, AIInternshipMatchingOutput } from '@/ai/flows/ai-internship-matching';

function formatStudentProfile(profile: Omit<StudentProfile, 'id' | 'email'>): string {
  return `
- Name: ${profile.name}
- Skills: ${profile.skills.join(', ')}
- Qualifications: ${profile.qualifications}
- Preferences: ${profile.preferences}
- Expected Salary: ${profile.expectedSalary}
  `.trim();
}

function formatInternshipList(list: Internship[]): string {
  return list.map(internship => JSON.stringify(internship)).join('\n');
}

export async function getInternshipRecommendations(profile: Omit<StudentProfile, 'id' | 'email'>): Promise<{ success: true, data: AIInternshipMatchingOutput } | { success: false, error: string }> {
  try {
    if (!profile.skills || profile.skills.length === 0) {
        return { success: false, error: 'Please add skills to your profile to get recommendations.' };
    }

    const formattedProfile = formatStudentProfile(profile);
    const formattedInternships = formatInternshipList(internships);

    const recommendations = await aiInternshipMatching({
        studentProfile: formattedProfile,
        internshipList: formattedInternships,
    });
    
    return { success: true, data: recommendations };

  } catch (error) {
    console.error('Error getting recommendations:', error);
    return { success: false, error: 'Failed to generate recommendations. Please try again later.' };
  }
}
