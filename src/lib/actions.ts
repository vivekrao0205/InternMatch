
'use server';

import { internships } from './data';
import { StudentProfile, Internship } from '@/types';
import { AIInternshipMatchingOutput } from '@/ai/flows/ai-internship-matching';

function matchSkills(studentSkills: string[], internshipList: Internship[]): AIInternshipMatchingOutput {
    const studentSkillsSet = new Set(studentSkills.map(skill => skill.toLowerCase()));

    const matches = internshipList.map(internship => {
        const requiredSkillsSet = new Set(internship.requiredSkills.map(skill => skill.toLowerCase()));
        
        if (requiredSkillsSet.size === 0) {
            return {
                ...internship,
                matchScore: 0,
                reason: "No required skills listed for this internship."
            };
        }

        const matchedSkills = new Set([...studentSkillsSet].filter(skill => requiredSkillsSet.has(skill)));
        
        const matchPercentage = (matchedSkills.size / requiredSkillsSet.size) * 100;
        
        const reason = `This internship is a ${Math.round(matchPercentage)}% match because you have ${matchedSkills.size} out of the ${requiredSkillsSet.size} required skills.`;

        return {
            ...internship,
            matchScore: Math.round(matchPercentage),
            reason,
        };
    });

    matches.sort((a, b) => b.matchScore - a.matchScore);

    const topInternships = matches.slice(0, 3).map(internship => ({
        title: internship.title,
        company: internship.company,
        matchScore: internship.matchScore,
        reason: internship.reason,
        salary: internship.salary
    }));

    return { topInternships };
}


export async function getInternshipRecommendations(profile: Omit<StudentProfile, 'id' | 'email'>): Promise<{ success: true, data: AIInternshipMatchingOutput } | { success: false, error: string }> {
  try {
    if (!profile.skills || profile.skills.length === 0) {
        return { success: false, error: 'Please add skills to your profile to get recommendations.' };
    }

    const recommendations = matchSkills(profile.skills, internships);
    
    return { success: true, data: recommendations };

  } catch (error) {
    console.error('Error getting recommendations:', error);
    return { success: false, error: 'Failed to generate recommendations. Please try again later.' };
  }
}
