import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, User, Briefcase, Search, FileCheck } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Matching',
    description: 'Our advanced AI analyzes your profile to find internships that perfectly match your skills and ambitions.',
  },
  {
    icon: <User className="h-8 w-8 text-primary" />,
    title: 'Build Your Profile',
    description: 'Create a comprehensive student profile to showcase your qualifications, skills, and preferences to top companies.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: 'Browse Opportunities',
    description: 'Explore a wide range of product management internships and filter them to fit your needs.',
  },
  {
    icon: <FileCheck className="h-8 w-8 text-primary" />,
    title: 'Track Applications',
    description: 'Stay organized by tracking the status of all your internship applications in one convenient dashboard.',
  },
];

export default function Home() {

  return (
    <div className="flex flex-col">
      <section className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-6 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter">
              Find Your Perfect <span className="text-primary">PM Internship</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Leverage the power of AI to connect with top tech companies and launch your career in product management. Your dream internship is just a match away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/internships">Browse Internships</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground mt-4">
              Our platform simplifies your internship search in four easy steps. Focus on what matters most: preparing for your future role.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center p-6 border-2 border-transparent hover:border-primary hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex justify-center items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <h3 className="text-xl font-headline font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to Launch Your Career?</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Join a growing community of aspiring product managers. Create your profile today and let opportunity find you.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/dashboard">Get Started for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
