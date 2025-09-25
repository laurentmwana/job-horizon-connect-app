'use client';

import { ActionDialog } from '@/components/action-dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFetch } from '@/hooks/use-fetch';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import type { Candidacy } from '@/types/model';
import { Link } from '@inertiajs/react';
import { FileIcon, Lock } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { CandidacyForm } from './candidacy-form';
import { PDFViewerDialog } from './candidacy-viewer-pdf';

type Props = {
    candidacies: Candidacy[];
};

export const CandidaciesTable: React.FC<Props> = ({ candidacies }) => {
    const [openViewerPdf, setOpenViewerPdf] = useState<string | null>(null);
    const [openDelete, setOpenDelete] = useState<string | null>(null);
    const [openForm, setOpenForm] = useState<string | null>(null);
    const fetchCandidaciesStatus = useFetch<string[]>('/api/enum/candidacy-status');

    return (
        <Table aria-label="Liste des candidatures">
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
                {candidacies.map((candidacy) => {
                    const isDeleteOpen = openDelete === candidacy.id;
                    const isFormOpen = openForm === candidacy.id;
                    const isEditable = candidacy.candidacy_at === null;
                    const isOpenViewerPdf = openViewerPdf === candidacy.id;

                    return (
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
                                <ActionDialog
                                    routeDelete={`/admin/candidacy/${candidacy.id}`}
                                    routeShow={`/admin/candidacy/${candidacy.id}`}
                                    routeOther={[
                                        { content: 'CV', icon: <FileIcon size={15} />, onClick: () => setOpenViewerPdf(candidacy.id) },
                                        { content: 'Changer le status', icon: <Lock size={15} />, onClick: () => setOpenForm(candidacy.id) },
                                    ]}
                                />

                                <PDFViewerDialog
                                    open={isOpenViewerPdf}
                                    setOpen={(v) => setOpenViewerPdf(v ? candidacy.id : null)}
                                    pdfUrl={`/storage/${candidacy.cv_path}`}
                                    name={`${candidacy.candidate.name} ${candidacy.candidate.firstname}`}
                                />

                                <CandidacyForm
                                    fetchCandidaciesStatus={fetchCandidaciesStatus}
                                    open={isFormOpen}
                                    setOpen={(v) => setOpenForm(v ? candidacy.id : null)}
                                    candidacy={candidacy}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
