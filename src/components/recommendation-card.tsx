
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from './ui/button';
import { AIInternshipMatchingOutput } from '@/ai/flows/ai-internship-matching';
import Link from 'next/link';
import { ArrowRight, IndianRupee } from 'lucide-react';
import { useState, useEffect } from 'react';

type Recommendation = AIInternshipMatchingOutput['topInternships'][0];

const CircleProgress = ({ value }: { value: number }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset = circumference - (value / 100) * circumference;
    setOffset(progressOffset);
  }, [value, circumference]);


  let colorClass = 'text-destructive';
  if (value >= 85) {
    colorClass = 'text-primary';
  } else if (value >= 70) {
    colorClass = 'text-accent';
  }

  return (
    <div className="relative h-20 w-20">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 70 70">
        <circle
          className="text-border"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
        />
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold">{value}</span>
      </div>
    </div>
  );
};


export default function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-6 flex gap-6 items-center">
        <div className="flex-shrink-0">
          <CircleProgress value={recommendation.matchScore} />
        </div>
        <div className="flex-grow">
          <CardTitle className="font-headline text-xl">{recommendation.title}</CardTitle>
          <CardDescription>{recommendation.company}</CardDescription>
           <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <IndianRupee className="h-4 w-4 flex-shrink-0" /> <span>{recommendation.salary}</span>
            </div>
        </div>
        <Button asChild variant="ghost" size="icon">
          <Link href="/internships">
            <ArrowRight />
          </Link>
        </Button>
      </CardContent>
      <Accordion type="single" collapsible className="w-full bg-muted/30">
        <AccordionItem value="item-1" className="border-t">
          <AccordionTrigger className="px-6 py-3 text-sm font-semibold hover:no-underline">
            Why it's a match
          </AccordionTrigger>
          <AccordionContent className="px-6 text-sm text-muted-foreground">
            {recommendation.reason}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
