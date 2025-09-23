import { ActionDialog } from '@/components/action-dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago, formatDate } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { Activity } from '@/types/model';
import React from 'react';

type Props = {
    activities: Activity[];
};

export const ActivitiesTable: React.FC<Props> = ({ activities }) => {
    return (
        <Table aria-label="Liste des activités">
            <TableHeader>
                <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Début</TableHead>
                    <TableHead>Fin</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Créé le</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {activities.map((activity) => (
                    <TableRow key={activity.id}>
                        <TableCell>{excerpt(activity.title, 40)}</TableCell>
                        <TableCell>
                            <Badge variant="secondary">{formatDate(activity.start_at)}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant="secondary">{formatDate(activity.end_at)}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{activity.type}</Badge>
                        </TableCell>
                        <TableCell>Il y a {ago(activity.created_at)}</TableCell>
                        <TableCell className="text-end">
                            <ActionDialog
                                routeShow={`/admin/activity/${activity.id}`}
                                routeEdit={`/admin/activity/${activity.id}/edit`}
                                routeDelete={`/admin/activity/${activity.id}`}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
