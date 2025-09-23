import { ConfirmationPasswordDialog } from '@/components/dialog-confirmation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFetch } from '@/hooks/use-fetch';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { Participant } from '@/types/model';
import { Link } from '@inertiajs/react';
import { Eye, MoreVertical, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { ParticipantForm } from './participant-form';

type Props = {
    participants: Participant[];
};

export const ParticipantTable: React.FC<Props> = ({ participants }) => {
    const [openDelete, setOpenDelete] = useState<string | null>(null); // id de la participation à supprimer
    const [openForm, setOpenForm] = useState<string | null>(null); // id de la participation à modifier
    const fetchParticipatedStatus = useFetch<string[]>('/api/enum/participated-status');

    return (
        <Table aria-label="Liste des participants">
            <TableHeader>
                <TableRow>
                    <TableHead>Candidat</TableHead>
                    <TableHead>Activité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Créé</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {participants.map((participant) => {
                    const isEditable = participant.participant_at === null;
                    const isDeleteOpen = openDelete === participant.id;
                    const isFormOpen = openForm === participant.id;

                    return (
                        <TableRow key={participant.id}>
                            <TableCell>{excerpt(`${participant.candidate.name} - ${participant.candidate.firstname}`, 40)}</TableCell>
                            <TableCell>
                                <Link className="hover:text-primary hover:underline" href={`/admin/activity/${participant.activity.id}`}>
                                    {excerpt(participant.activity.title, 40)}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{participant.status}</Badge>
                            </TableCell>
                            <TableCell>Il y a {ago(participant.created_at)}</TableCell>
                            <TableCell>
                                <div className="flex items-center justify-end gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/participant/${participant.id}`}>
                                            <Eye size={15} />
                                        </Link>
                                    </Button>

                                    <Button onClick={() => setOpenDelete(participant.id)} variant="destructive" size="sm">
                                        <Trash size={15} />
                                    </Button>

                                    {isEditable && (
                                        <Button onClick={() => setOpenForm(participant.id)} variant="secondary" size="sm">
                                            <MoreVertical size={15} />
                                        </Button>
                                    )}

                                    {/* Dialogs */}
                                    <ConfirmationPasswordDialog
                                        open={isDeleteOpen}
                                        setOpen={(v) => setOpenDelete(v ? participant.id : null)}
                                        url={`/admin/participant/${participant.id}`}
                                    />

                                    <ParticipantForm
                                        fetchParticipatedStatus={fetchParticipatedStatus}
                                        open={isFormOpen}
                                        setOpen={(v) => setOpenForm(v ? participant.id : null)}
                                        participant={participant}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
