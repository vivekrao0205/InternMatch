'use client';

import { useState, useMemo } from 'react';
import InternshipCard from '@/components/internship-card';
import { internships as allInternships } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const uniqueSkills = [...new Set(allInternships.flatMap(i => i.requiredSkills))].sort();
const uniqueLocations = [...new Set(allInternships.map(i => i.location))].sort();

export default function InternshipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const filteredInternships = useMemo(() => {
    return allInternships.filter(internship => {
      const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            internship.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSkill = !selectedSkill || internship.requiredSkills.includes(selectedSkill);
      const matchesLocation = !selectedLocation || internship.location === selectedLocation;
      return matchesSearch && matchesSkill && matchesLocation;
    });
  }, [searchTerm, selectedSkill, selectedLocation]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSkill('');
    setSelectedLocation('');
  }

  const hasActiveFilters = searchTerm || selectedSkill || selectedLocation;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold">Find Your Internship</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Search and filter through our curated list of product management internships from top companies.
        </p>
      </div>

      <Card className="p-4 mb-8 sticky top-[65px] z-40 bg-background/80 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <div className="relative sm:col-span-2 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSkill} onValueChange={setSelectedSkill}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Skills</SelectItem>
              {uniqueSkills.map(skill => (
                <SelectItem key={skill} value={skill}>{skill}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              {uniqueLocations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={resetFilters} className="sm:col-span-2 lg:col-span-4">
              <X className="mr-2 h-4 w-4"/>
              Reset Filters
            </Button>
          )}
        </div>
      </Card>

      {filteredInternships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl font-semibold">No internships found.</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
