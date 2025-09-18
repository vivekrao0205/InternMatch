'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getInternshipRecommendations } from '@/lib/actions';
import { AIInternshipMatchingOutput } from '@/ai/flows/ai-internship-matching';
import RecommendationCard from '@/components/recommendation-card';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import AuthGuard from '@/components/auth-guard';
import { studentProfile } from '@/lib/data';
import Link from 'next/link';

function RecommendationsPageContent() {
  const [recommendations, setRecommendations] = useState<AIInternshipMatchingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    const {id, email, ...profileData} = studentProfile;
    const result = await getInternshipRecommendations(profileData);
    if (result.success) {
      setRecommendations(result.data);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <AuthGuard>
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="mx-auto h-12 w-12 text-accent mb-4" />
            <h1 className="text-4xl font-headline font-bold">AI-Powered Recommendations</h1>
            <p className="text-muted-foreground mt-2">
              Here are your top 3 internship matches based on your profile. Keep your profile updated for the best results.
            </p>
            
            <div className="flex gap-4 justify-center">
             <Button onClick={handleGenerate} disabled={isLoading} size="lg" className="mt-6">
              <Sparkles className="mr-2 h-5 w-5" />
              {isLoading ? 'Refreshing...' : 'Refresh Matches'}
            </Button>
             <Button asChild size="lg" className="mt-6" variant="outline">
                <Link href="/profile">Update Profile</Link>
            </Button>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-12">
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            )}
            {error && (
                <Card className="bg-destructive/10 border-destructive">
                    <CardContent className="p-6 flex items-center gap-4">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                        <div>
                            <h3 className="font-semibold text-destructive">An Error Occurred</h3>
                            <p className="text-sm text-destructive/80">{error}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
            {recommendations && (
                <div>
                    <h2 className="text-2xl font-headline font-semibold mb-6 text-center">Your Top 3 Matches</h2>
                    <div className="space-y-4">
                        {recommendations.topInternships.map((rec, index) => (
                            <RecommendationCard key={index} recommendation={rec} />
                        ))}
                    </div>
                </div>
            )}
            {!recommendations && !isLoading && !error && (
                <Card className="text-center py-12 border-dashed">
                    <CardContent>
                        <h3 className="text-xl font-semibold">Ready to find your match?</h3>
                        <p className="text-muted-foreground mt-2">Click the button above to generate personalized recommendations based on your profile.</p>
                    </CardContent>
                </Card>
            )}
          </div>
        </div>
    </AuthGuard>
  );
}

export default function RecommendationsPage() {
    return (
        <RecommendationsPageContent />
    )
}
