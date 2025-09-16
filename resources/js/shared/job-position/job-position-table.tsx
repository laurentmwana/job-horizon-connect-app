import { ActionDialog } from '@/components/action-dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { JobPosition } from '@/types/model';
import React from 'react';

type Props = { jobPositions: JobPosition[] };

export const JobPositionsTable: React.FC<Props> = ({ jobPositions }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Compétences</TableHead>
                    <TableHead>Créer</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobPositions.map((jobPosiiton) => {
                    return (
                        <TableRow key={jobPosiiton.id}>
                            <TableCell>{excerpt(jobPosiiton.name, 40)}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{jobPosiiton.skills.length}</Badge>
                            </TableCell>
                            <TableCell>Il y a {ago(jobPosiiton.created_at)}</TableCell>
                            <TableCell>
                                <ActionDialog
                                    routeShow={`/admin/job-position/${jobPosiiton.id}`}
                                    routeEdit={`/admin/job-position/${jobPosiiton.id}/edit`}
                                    routeDelete={`/admin/job-position/${jobPosiiton.id}`}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
