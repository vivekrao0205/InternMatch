'use client';

import AuthGuard from '@/components/auth-guard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, Send } from 'lucide-react';
import { internships } from '@/lib/data';

const internshipSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location is required." }),
  requiredSkills: z.string().min(3, { message: "Please list at least one skill." }),
  description: z.string().min(50, { message: "Description should be at least 50 characters." }),
});

type InternshipFormValues = z.infer<typeof internshipSchema>;

function PostInternshipPageContent() {
  const { toast } = useToast();

  const form = useForm<InternshipFormValues>({
    resolver: zodResolver(internshipSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      requiredSkills: '',
      description: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: InternshipFormValues) {
    const newInternship = {
      id: String(internships.length + 2),
      ...data,
      logoId: 'logo-techcorp', // Using a default logo for now
      requiredSkills: data.requiredSkills.split(',').map(s => s.trim()),
    };
    console.log("Posting new internship:", newInternship); // In a real app, this would be an API call
    
    // This is a client-side mock update.
    // In a real app, you would re-fetch data or use a state management library.
    internships.push(newInternship);

    toast({
      title: 'Internship Posted!',
      description: `The "${data.title}" position has been successfully listed.`,
    });
    form.reset();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Briefcase className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl font-headline">Post an Internship</CardTitle>
                <CardDescription>Fill out the details below to find the best student talent.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Internship Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Product Manager Intern" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. TechCorp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. San Francisco, CA or Remote" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requiredSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Skills</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Market Research, SQL, Agile" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter required skills, separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Internship Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a detailed description of the role, responsibilities, and qualifications..."
                          className="resize-y min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {form.formState.isSubmitting ? 'Submitting...' : 'Post Internship'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PostInternshipPage() {
  return (
    <AuthGuard>
      <PostInternshipPageContent />
    </AuthGuard>
  );
}
