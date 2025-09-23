import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { Candidacy, Participant } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Link } from '@inertiajs/react';
import React from 'react';

type StatsDetailsCandidaciesProps = {
    candidacies: PaginationData<Candidacy>;
};

export const StatsDetailsCandidacies: React.FC<StatsDetailsCandidaciesProps> = ({ candidacies }) => {
    return (
        <div className="space-y-4">
            <Table aria-label="Détails des candidatures">
                <TableHeader>
                    <TableRow>
                        <TableHead>Offre</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Mis à jour</TableHead>
                        <TableHead>Créé</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {candidacies.data.map((candidacy) => (
                        <TableRow key={candidacy.id}>
                            <TableCell>
                                <Link href={`/offer/${candidacy.offer.id}`} className="hover:underline">
                                    {excerpt(candidacy.offer.name, 30)}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{candidacy.status}</Badge>
                            </TableCell>
                            <TableCell>{candidacy.candidacy_at ? ago(candidacy.candidacy_at) : '-'}</TableCell>
                            <TableCell>{ago(candidacy.created_at)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination items={candidacies} />
        </div>
    );
};

type StatsDetailsParticipantsProps = {
    participants: PaginationData<Participant>;
};

export const StatsDetailsParticipants: React.FC<StatsDetailsParticipantsProps> = ({ participants }) => {
    return (
        <div className="space-y-4">
            <Table aria-label="Détails des participants">
                <TableHeader>
                    <TableRow>
                        <TableHead>Activité</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Mis à jour</TableHead>
                        <TableHead>Créé</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {participants.data.map((participant) => (
                        <TableRow key={participant.id}>
                            <TableCell>
                                <Link href={`/activity/${participant.activity.id}`} className="hover:underline">
                                    {excerpt(participant.activity.title, 30)}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{participant.status}</Badge>
                            </TableCell>
                            <TableCell>{participant.participant_at ? ago(participant.participant_at) : '-'}</TableCell>
                            <TableCell>{ago(participant.created_at)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination items={participants} />
        </div>
    );
};
