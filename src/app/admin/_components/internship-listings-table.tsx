import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import type { Internship } from '@/types';

type InternshipListingsTableProps = {
  internships: Internship[];
};

export default function InternshipListingsTable({ internships }: InternshipListingsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="hidden sm:table-cell">Location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {internships.map((internship) => (
          <TableRow key={internship.id}>
            <TableCell className="font-medium">{internship.title}</TableCell>
            <TableCell>{internship.company}</TableCell>
            <TableCell className="hidden sm:table-cell">
                <Badge variant="outline">{internship.location}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}