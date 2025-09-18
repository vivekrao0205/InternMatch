import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { StudentProfile } from '@/types';

type StudentProfilesTableProps = {
  profiles: StudentProfile[];
};

export default function StudentProfilesTable({ profiles }: StudentProfilesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="hidden sm:table-cell">Skills</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {profiles.map((profile) => (
          <TableRow key={profile.id}>
            <TableCell className="font-medium">{profile.name}</TableCell>
            <TableCell>{profile.email}</TableCell>
            <TableCell className="hidden sm:table-cell">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    <p className="truncate max-w-xs">{profile.skills.join(', ')}</p>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="start">
                    <p className="max-w-md">{profile.skills.join(', ')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}