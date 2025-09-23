import { ActionDialog } from '@/components/action-dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { JobPosition } from '@/types/model';
import React from 'react';

type Props = {
    jobPositions: JobPosition[];
};

export const JobPositionsTable: React.FC<Props> = ({ jobPositions }) => {
    return (
        <Table aria-label="Liste des postes">
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Compétences</TableHead>
                    <TableHead>Créé</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobPositions.map((jobPosition) => (
                    <TableRow key={jobPosition.id}>
                        <TableCell>{excerpt(jobPosition.name, 40)}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{jobPosition.skills.length}</Badge>
                        </TableCell>
                        <TableCell>Il y a {ago(jobPosition.created_at)}</TableCell>
                        <TableCell className="text-end">
                            <ActionDialog
                                routeShow={`/admin/job-position/${jobPosition.id}`}
                                routeEdit={`/admin/job-position/${jobPosition.id}/edit`}
                                routeDelete={`/admin/job-position/${jobPosition.id}`}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
