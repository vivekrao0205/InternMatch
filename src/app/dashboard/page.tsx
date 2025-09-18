
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { applications, studentProfile } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import type { Application } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowRight, Briefcase, FileCheck, Award, Sparkles } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartPie, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { PieChart } from 'recharts';
import AuthGuard from '@/components/auth-guard';
import { useState, useEffect } from 'react';
import { AIInternshipMatchingOutput } from '@/ai/flows/ai-internship-matching';
import { getInternshipRecommendations } from '@/lib/actions';
import RecommendationCard from '@/components/recommendation-card';
import { Skeleton } from '@/components/ui/skeleton';

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
    return (
      <Card className="hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{application.internship.title}</CardTitle>
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
  const [recommendations, setRecommendations] = useState<AIInternshipMatchingOutput | null>(null);
  const [isLoadingRecs, setIsLoadingRecs] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoadingRecs(true);
      const skills = studentProfile.skills.join(', ');
      const result = await getInternshipRecommendations(skills);
      if (result.success) {
        setRecommendations(result.data);
      }
      setIsLoadingRecs(false);
    }
    fetchRecommendations();
  }, []);

  const totalApplications = applications.length;
  const interviewCount = applications.filter(app => app.status === 'Interview').length;
  const offeredCount = applications.filter(app => app.status === 'Offered').length;

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<Application['status'], number>);

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
    fill: `var(--color-${status.toLowerCase().replace(' ', '-')})`
  }));

  const chartConfig = {
    count: {
      label: 'Applications',
    },
    applied: {
      label: 'Applied',
      color: 'hsl(var(--chart-1))',
    },
    'under-review': {
      label: 'Under Review',
      color: 'hsl(var(--chart-2))',
    },
    interview: {
      label: 'Interview',
      color: 'hsl(var(--chart-3))',
    },
    offered: {
      label: 'Offered',
      color: 'hsl(var(--chart-4))',
    },
    rejected: {
      label: 'Rejected',
      color: 'hsl(var(--chart-5))',
    },
  } as const;

  return (
    <AuthGuard>
        <div className="bg-background">
          <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-4xl font-headline font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-2">Track all your internship applications in one place.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Total Applications</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalApplications}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Interviews</CardTitle>
                  <FileCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{interviewCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Offers</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{offeredCount}</div>
                </CardContent>
              </Card>
               {totalApplications > 0 && (
                <Card className="md:col-span-2 lg:col-span-1">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Application Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square h-[200px]"
                        >
                        <PieChart>
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                            />
                            <ChartPie
                            data={chartData}
                            dataKey="count"
                            nameKey="status"
                            innerRadius={50}
                            />
                             <ChartLegend
                                content={<ChartLegendContent nameKey="status" />}
                                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                            />
                        </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
               )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-6">
                 <h2 className="text-2xl font-headline font-bold">My Applications</h2>
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
              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-bold">Top Recommendations</h2>
                 {isLoadingRecs && (
                    <div className="space-y-4">
                        <Skeleton className="h-32 w-full rounded-lg" />
                        <Skeleton className="h-32 w-full rounded-lg" />
                        <Skeleton className="h-32 w-full rounded-lg" />
                    </div>
                )}
                {recommendations && (
                    <div className="space-y-4">
                        {recommendations.topInternships.map((rec, index) => (
                            <RecommendationCard key={index} recommendation={rec} />
                        ))}
                    </div>
                )}
                 {!isLoadingRecs && (!recommendations || recommendations.topInternships.length === 0) && (
                    <Card className="text-center py-12">
                        <CardContent>
                             <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                            <h3 className="text-xl font-semibold">No Recommendations</h3>
                            <p className="text-muted-foreground mt-2">Update your profile with more skills to get better matches.</p>
                             <Button asChild className="mt-4" variant="outline">
                                <Link href="/profile">Update Profile</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
              </div>
            </div>
          </div>
        </div>
    </AuthGuard>
  );
}

export default function DashboardPage() {
    return (
        <DashboardPageContent />
    )
}
