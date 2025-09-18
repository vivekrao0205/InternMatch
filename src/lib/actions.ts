'use server';

import { studentProfile, internships } from './data';
import { StudentProfile, Internship } from '@/types';
import { AIInternshipMatchingOutput } from '@/ai/flows/ai-internship-matching';

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

export async function getInternshipRecommendations(skills: string): Promise<{ success: true, data: AIInternshipMatchingOutput } | { success: false, error: string }> {
  try {
    const yourSkills = new Set(skills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean));
    if (yourSkills.size === 0) {
      return { success: false, error: 'Please enter at least one skill.' };
    }

    const matches = internships.map(internship => {
      const requiredSkills = new Set(internship.requiredSkills.map(s => s.toLowerCase()));
      const matchedSkills = new Set([...yourSkills].filter(skill => requiredSkills.has(skill)));
      
      const matchPercentage = requiredSkills.size > 0 
        ? (matchedSkills.size / requiredSkills.size) * 100 
        : 0;

      let reason = "This internship is a potential match based on your profile.";
      if (matchedSkills.size > 0) {
        const sharedSkills = Array.from(matchedSkills).join(', ');
        reason = `This is a strong match because of your skills in: ${sharedSkills}.`;
      } else if (requiredSkills.size > 0) {
        reason = `While this internship requires skills like ${Array.from(requiredSkills).join(', ')}, it could still be a good learning opportunity.`;
      }
      
      return {
        ...internship,
        matchScore: Math.round(matchPercentage),
        reason: reason,
        matchedSkills: Array.from(matchedSkills)
      };
    });

    matches.sort((a, b) => b.matchScore - a.matchScore);

    const top3Internships = matches.slice(0, 3).map(internship => ({
        title: internship.title,
        company: internship.company,
        matchScore: internship.matchScore,
        reason: internship.reason
    }));

    const result: AIInternshipMatchingOutput = {
      topInternships: top3Internships,
    };
    
    return { success: true, data: result };

  } catch (error) {
    console.error('Error getting recommendations:', error);
    return { success: false, error: 'Failed to generate recommendations. Please try again later.' };
  }
}
