import { ActionDialog } from '@/components/action-dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago, formatDate } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { Offer } from '@/types/model';
import React from 'react';

type Props = { offers: Offer[] };

export const OffersTable: React.FC<Props> = ({ offers }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Début</TableHead>
                    <TableHead>Fin</TableHead>
                    <TableHead>Postes</TableHead>
                    <TableHead>Créer</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {offers.map((offer) => {
                    return (
                        <TableRow key={offer.id}>
                            <TableCell>{excerpt(offer.name, 40)}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{formatDate(offer.start_at)}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">{formatDate(offer.end_at)}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{offer.job_positions.length}</Badge>
                            </TableCell>
                            <TableCell>Il y a {ago(offer.created_at)}</TableCell>
                            <TableCell>
                                <ActionDialog
                                    routeShow={`/admin/offer/${offer.id}`}
                                    routeEdit={`/admin/offer/${offer.id}/edit`}
                                    routeDelete={`/admin/offer/${offer.id}`}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
