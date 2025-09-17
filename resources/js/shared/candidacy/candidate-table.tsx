import { ConfirmationPasswordDialog } from '@/components/dialog-confirmation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFetch } from '@/hooks/use-fetch';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { Candidacy } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Eye, MoreVertical, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { CandidacyForm } from './candidate-form';

type Props = { candidacies: Candidacy[] };

export const CandidaciesTable: React.FC<Props> = ({ candidacies }) => {
    const [openDelete, setOpenDelete] = useState<string | null>(null); // id de la candidature à supprimer
    const [openForm, setOpenForm] = useState<string | null>(null); // id de la candidature à modifier
    const fetchCandidaciesStatus = useFetch<string[]>('/api/enum/candidacy-status');

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Candidat</TableHead>
                    <TableHead>Offre</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Créé</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {candidacies.map((candidacy) => (
                    <TableRow key={candidacy.id}>
                        <TableCell>{excerpt(`${candidacy.candidate.name} - ${candidacy.candidate.firstname}`, 40)}</TableCell>
                        <TableCell>
                            <Link className="hover:text-primary hover:underline" href={`/admin/offer/${candidacy.offer.id}`}>
                                {excerpt(candidacy.offer.name, 40)}
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{candidacy.status}</Badge>
                        </TableCell>
                        <TableCell>Il y a {ago(candidacy.created_at)}</TableCell>
                        <TableCell>
                            <div className="flex items-center justify-end gap-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/admin/candidacy/${candidacy.id}`}>
                                        <Eye size={15} />
                                    </Link>
                                </Button>

                                <Button onClick={() => setOpenDelete(candidacy.id)} variant="destructive" size="sm">
                                    <Trash size={15} />
                                </Button>

                                {candidacy.candidacy_at === null && (
                                    <Button onClick={() => setOpenForm(candidacy.id)} variant="secondary" size="sm">
                                        <MoreVertical size={15} />
                                    </Button>
                                )}
                                <ConfirmationPasswordDialog
                                    open={openDelete === candidacy.id}
                                    setOpen={(v) => setOpenDelete(v ? candidacy.id : null)}
                                    url={`/admin/candidacy/${candidacy.id}`}
                                />

                                <CandidacyForm
                                    fetchCandidaciesStatus={fetchCandidaciesStatus}
                                    open={openForm === candidacy.id}
                                    setOpen={(v) => setOpenForm(v ? candidacy.id : null)}
                                    candidacy={candidacy}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
