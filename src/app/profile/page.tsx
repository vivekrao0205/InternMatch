
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
import { studentProfile, availableSkills } from '@/lib/data';
import { User, Save } from 'lucide-react';
import AuthGuard from '@/components/auth-guard';
import { useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  college: z.string().min(3, { message: "Please enter your college name." }),
  cgpa: z.string().min(1, { message: "Please enter your CGPA."}),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  skills: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one skill.",
  }),
  qualifications: z.string().min(20, { message: "Qualifications summary should be at least 20 characters." }),
  locationPreference: z.string({
    required_error: "Please select a location preference.",
  }),
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
      college: '',
      cgpa: '',
      phoneNumber: '',
      skills: [],
      qualifications: '',
      locationPreference: '',
      expectedSalary: '',
    },
    mode: 'onChange',
  });
  
  useEffect(() => {
    form.reset({
      name: studentProfile.name,
      email: studentProfile.email,
      skills: studentProfile.skills,
      qualifications: studentProfile.qualifications,
      locationPreference: studentProfile.locationPreference,
      expectedSalary: studentProfile.expectedSalary,
      college: studentProfile.college,
      cgpa: studentProfile.cgpa,
      phoneNumber: studentProfile.phoneNumber,
    });
  }, [form]);


  async function onSubmit(data: ProfileFormValues) {
    // Update the mock data object
    studentProfile.name = data.name;
    studentProfile.skills = data.skills;
    studentProfile.qualifications = data.qualifications;
    studentProfile.locationPreference = data.locationPreference;
    studentProfile.expectedSalary = data.expectedSalary;
    studentProfile.college = data.college;
    studentProfile.cgpa = data.cgpa;
    studentProfile.phoneNumber = data.phoneNumber;
    
    console.log("Updated profile data:", studentProfile);

    toast({
      title: 'Profile Updated!',
      description: 'Your profile has been successfully saved.',
    });
    form.reset(data);
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
                       <FormField
                        control={form.control}
                        name="college"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>College</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Indian Institute of Technology, Bombay" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="cgpa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CGPA (on a 10-point scale)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 8.5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. +91 98765 43210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="skills"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Skills</FormLabel>
                            <FormDescription>
                              Select the skills you possess.
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {availableSkills.map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="skills"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                          </div>
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
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <FormField
                        control={form.control}
                        name="locationPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Working Location</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your preference" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="On-site">On-site</SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                                <SelectItem value="Remote">Remote</SelectItem>
                              </SelectContent>
                            </Select>
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
                              <Input placeholder="e.g. ₹30,000 /month" {...field} />
                            </FormControl>
                             <FormDescription>
                              Enter your desired monthly salary.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                     </div>
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
