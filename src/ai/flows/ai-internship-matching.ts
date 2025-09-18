
// This is a server-side file.
'use server';

/**
 * @fileOverview AI-powered internship matching flow.
 *
 * This file defines a Genkit flow that recommends the top 3 internships that best match a student's profile.
 *
 * @remarks
 * - The flow uses a prompt to match student profiles with internship descriptions.
 * - It returns a list of the top 3 internship recommendations.
 *
 * @exports `aiInternshipMatching` - The main function to trigger the flow.
 * @exports `AIInternshipMatchingInput` - The input type for the flow.
 * @exports `AIInternshipMatchingOutput` - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const AIInternshipMatchingInputSchema = z.object({
  studentProfile: z
    .string()
    .describe('A detailed description of the student profile, including skills, qualifications, and preferences.'),
  internshipList: z
    .string()
    .describe('A list of available internships with details such as title, company, required skills, and location.'),
});
export type AIInternshipMatchingInput = z.infer<typeof AIInternshipMatchingInputSchema>;

// Define the output schema
const AIInternshipMatchingOutputSchema = z.object({
  topInternships: z.array(
    z.object({
      title: z.string().describe('The title of the internship.'),
      company: z.string().describe('The company offering the internship.'),
      matchScore: z.number().describe('A score indicating how well the internship matches the student profile.'),
      reason: z.string().describe('Reason why this internship is a good match for the student.'),
      salary: z.string().describe('The estimated salary for the internship.'),
    })
  ).max(3).describe('The top 3 internship recommendations based on the student profile.'),
});
export type AIInternshipMatchingOutput = z.infer<typeof AIInternshipMatchingOutputSchema>;


// Exported function to call the flow
export async function aiInternshipMatching(input: AIInternshipMatchingInput): Promise<AIInternshipMatchingOutput> {
  return aiInternshipMatchingFlow(input);
}

// Define the prompt
const aiInternshipMatchingPrompt = ai.definePrompt({
  name: 'aiInternshipMatchingPrompt',
  input: {schema: AIInternshipMatchingInputSchema},
  output: {schema: AIInternshipMatchingOutputSchema},
  prompt: `You are an AI-powered internship matching tool. You will receive a student profile and a list of available internships. Your task is to identify the top 3 internships that best match the student's profile based on their skills, qualifications, and preferences.

Student Profile:
{{studentProfile}}

Internship List:
{{internshipList}}

For each internship, provide a match score (out of 100) indicating how well it aligns with the student's profile and the reason for your score.

Return the top 3 internships with the highest match scores.

Output format: 
{
  "topInternships": [
    {
      "title": "Internship Title 1",
      "company": "Company Name 1",
      "matchScore": 95,
      "reason": "This internship is a great match because...",
      "salary": "₹50,000 - ₹70,000 /month"
    },
    {
      "title": "Internship Title 2",
      "company": "Company Name 2",
      "matchScore": 90,
      "reason": "This internship is a good match because...",
       "salary": "₹45,000 - ₹65,000 /month"
    },
    {
      "title": "Internship Title 3",
      "company": "Company Name 3",
      "matchScore": 85,
      "reason": "This internship is a potential match because...",
      "salary": "₹55,000 - ₹75,000 /month"
    }
  ]
}`,
});

// Define the flow
const aiInternshipMatchingFlow = ai.defineFlow(
  {
    name: 'aiInternshipMatchingFlow',
    inputSchema: AIInternshipMatchingInputSchema,
    outputSchema: AIInternshipMatchingOutputSchema,
  },
  async input => {
    const {output} = await aiInternshipMatchingPrompt(input);
    return output!;
  }
);
