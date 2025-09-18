import AuthGuard from '@/components/auth-guard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { applications } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';
import type { Application } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

function getStatusVariant(status: Application['status']): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (status) {
        case 'Offered':
            return 'default';
        case 'Interview':
            return 'secondary';
        case 'Under Review':
            return 'outline';
        case 'Applied':
            return 'outline';
        default:
            return 'destructive';
    }
}

function ApplicationCard({ application }: { application: Application }) {
    const logo = placeholderImages.find(p => p.id === application.internship.logoId);
    return (
      <Card className="hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 flex-shrink-0">
                {logo && <Image src={logo.imageUrl} alt={`${application.internship.company} logo`} width={64} height={64} className="rounded-md object-contain" data-ai-hint={logo.imageHint} />}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-headline">{application.internship.title}</CardTitle>
                    <CardDescription>{application.internship.company} &middot; {application.internship.location}</CardDescription>
                  </div>
                  <Badge variant={getStatusVariant(application.status)} className="ml-4 whitespace-nowrap">{application.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Applied on: {new Date(application.appliedDate).toLocaleDateString()}</p>
            </div>
            <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
                <Link href={`/internships`}>
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </Button>
        </CardContent>
      </Card>
    )
}

function DashboardPageContent() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
            <h1 className="text-4xl font-headline font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Track all your internship applications in one place.</p>
        </div>

        <div className="space-y-6">
            {applications.length > 0 ? (
                applications.map(app => <ApplicationCard key={app.id} application={app} />)
            ) : (
                <Card className="text-center py-12">
                    <CardContent>
                        <h3 className="text-xl font-semibold">No Applications Yet</h3>
                        <p className="text-muted-foreground mt-2">Start exploring and apply for internships to see them here.</p>
                        <Button asChild className="mt-4">
                            <Link href="/internships">Browse Internships</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardPageContent />
    </AuthGuard>
  );
}
