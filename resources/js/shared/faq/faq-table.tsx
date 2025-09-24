import { ActionDialog } from '@/components/action-dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { Faq } from '@/types/model';
import React from 'react';

type Props = {
    faqs: Faq[];
};

export const FaqsTable: React.FC<Props> = ({ faqs }) => {
    console.log(faqs);
    return (
        <Table aria-label="Liste des faqs">
            <TableHeader>
                <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>En vedette</TableHead>
                    <TableHead>Créé</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {faqs.map((faq) => (
                    <TableRow key={faq.id}>
                        <TableCell>{excerpt(faq.question, 40)}</TableCell>
                        <TableCell>
                            <Badge variant={faq.is_star ? 'outline' : 'destructive'}>{faq.is_star ? 'Oui' : 'Non'}</Badge>
                        </TableCell>
                        <TableCell>Il y a {ago(faq.created_at)}</TableCell>
                        <TableCell className="text-end">
                            <ActionDialog
                                routeShow={`/admin/faq/${faq.id}`}
                                routeEdit={`/admin/faq/${faq.id}/edit`}
                                routeDelete={`/admin/faq/${faq.id}`}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
