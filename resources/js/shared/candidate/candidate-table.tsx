import { ActionDialog } from '@/components/action-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { Candidate } from '@/types/model';
import React from 'react';

type Props = { candidates: Candidate[] };

export const CandidatesTable: React.FC<Props> = ({ candidates }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Postnom</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Créer</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {candidates.map((candidate) => {
                    return (
                        <TableRow key={candidate.id}>
                            <TableCell>{excerpt(candidate.name, 40)}</TableCell>
                            <TableCell>{excerpt(candidate.firstname, 40)}</TableCell>
                            <TableCell>{excerpt(candidate.gender, 40)}</TableCell>
                            <TableCell>Il y a {ago(candidate.created_at)}</TableCell>
                            <TableCell>
                                <ActionDialog
                                    routeShow={`/admin/candidate/${candidate.id}`}
                                    routeEdit={`/admin/candidate/${candidate.id}/edit`}
                                    routeDelete={`/admin/candidate/${candidate.id}`}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
