
'use client';

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
import { studentProfile } from '@/lib/data';
import { User, Save } from 'lucide-react';
import AuthGuard from '@/components/auth-guard';
import { useEffect } from 'react';


const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  skills: z.string().min(3, { message: "Please list at least one skill." }),
  qualifications: z.string().min(20, { message: "Qualifications summary should be at least 20 characters." }),
  preferences: z.string().min(10, { message: "Preferences should be at least 10 characters." }),
  expectedSalary: z.string().min(3, { message: "Please enter your expected salary." }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function ProfilePageContent() {
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      skills: '',
      qualifications: '',
      preferences: '',
      expectedSalary: '',
    },
    mode: 'onChange',
  });
  
  useEffect(() => {
    form.reset({
      name: studentProfile.name,
      email: studentProfile.email,
      skills: studentProfile.skills.join(', '),
      qualifications: studentProfile.qualifications,
      preferences: studentProfile.preferences,
      expectedSalary: studentProfile.expectedSalary,
    });
  }, [form]);


  async function onSubmit(data: ProfileFormValues) {
    // Update the mock data object
    studentProfile.name = data.name;
    studentProfile.skills = data.skills.split(',').map(s => s.trim());
    studentProfile.qualifications = data.qualifications;
    studentProfile.preferences = data.preferences;
    studentProfile.expectedSalary = data.expectedSalary;
    
    console.log("Updated profile data:", studentProfile);

    toast({
      title: 'Profile Updated!',
      description: 'Your profile has been successfully saved.',
    });
  }

  return (
    <AuthGuard>
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <User className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Student Profile</CardTitle>
                    <CardDescription>Keep your profile updated to get the best internship matches.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Priya Sharma" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="e.g. priya.sharma@email.com" {...field} readOnly />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Market Research, SQL, Agile" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your skills, separated by commas.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="qualifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Qualifications</FormLabel>                          
                          <FormControl>
                            <Textarea
                              placeholder="Summarize your academic and professional qualifications..."
                              className="resize-y min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferences"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Internship Preferences</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your ideal internship, including industry, company size, or location..."
                              className="resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="expectedSalary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Salary</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. ₹50,000 /month" {...field} />
                          </FormControl>
                           <FormDescription>
                            Enter your desired monthly salary.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
                      <Save className="mr-2 h-4 w-4" />
                      {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
    </AuthGuard>
  );
}

export default function ProfilePage() {
    return (
        <ProfilePageContent />
    )
}
