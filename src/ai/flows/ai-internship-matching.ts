
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
export const AIInternshipMatchingOutputSchema = z.object({
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


// This is a placeholder function, the actual logic is in actions.ts
export async function aiInternshipMatching(input: AIInternshipMatchingInput): Promise<AIInternshipMatchingOutput> {
  return { topInternships: [] };
}
