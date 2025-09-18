import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Internship } from '@/types';
import { MapPin, Briefcase, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type InternshipCardProps = {
  internship: Internship;
};

export default function InternshipCard({ internship }: InternshipCardProps) {
  const { toast } = useToast();

  const handleApply = () => {
    toast({
      title: 'Application Sent!',
      description: `Your application for ${internship.title} at ${internship.company} has been submitted.`,
    });
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-4 bg-muted/30">
        <div>
          <CardTitle className="text-xl font-headline leading-tight">{internship.title}</CardTitle>
          <CardDescription className="text-base">{internship.company}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" /> <span>{internship.location}</span>
            </div>
            <div className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 flex-shrink-0" /> <span>{internship.salary}</span>
            </div>
        </div>
        <p className="text-sm text-foreground/80 mb-4 line-clamp-3">{internship.description}</p>
        <div className="space-y-2">
            <h4 className="text-sm font-semibold">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
            {internship.requiredSkills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/30">
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleApply}>
            <Briefcase className="mr-2 h-4 w-4"/>
            Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}
