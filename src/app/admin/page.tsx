'use client';

import AuthGuard from '@/components/auth-guard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { studentProfile, internships } from '@/lib/data';
import { User, Briefcase } from 'lucide-react';
import StudentProfilesTable from './_components/student-profiles-table';
import InternshipListingsTable from './_components/internship-listings-table';

function AdminPageContent() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-headline font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Review and manage student profiles and internship listings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <User className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Student Profiles</CardTitle>
                <CardDescription>All registered student profiles.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <StudentProfilesTable profiles={[studentProfile]} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Internship Listings</CardTitle>
                <CardDescription>All posted internship opportunities.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <InternshipListingsTable internships={internships} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminPage() {
  // In a real app, you'd want to protect this route for admin users only.
  // We'll use the standard AuthGuard for now.
  return (
    <AuthGuard>
      <AdminPageContent />
    </AuthGuard>
  );
}