import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { Participant } from '@/types/model';
import { router } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';
import React from 'react';

type ParticipantCollectionProps = { participant: Participant };

export const ParticipantCollection: React.FC<ParticipantCollectionProps> = ({ participant }) => {
    return (
        <Card className="flex h-full flex-col pt-0">
            <CardHeader>
                <CardTitle>{excerpt(participant.candidate.name, 40)}</CardTitle>
                <CardDescription className="mb-1">{excerpt(participant.activity.title, 100)}</CardDescription>

                <p className="text-xs text-muted-foreground">Publié il y a {ago(participant.created_at)}</p>
            </CardHeader>

            <CardFooter className="mt-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => router.get(`/participant/${participant.id}`)}
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                    >
                        <InfoIcon size={15} />
                        <span>Détails</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

type ParticipantDetailsProps = { participant: Participant };

export const ParticipantAdminDetails: React.FC<ParticipantDetailsProps> = ({ participant }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border pt-0 shadow-md">
            <CardContent className="space-y-4 p-6">
                <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-2xl">{participant.activity.title}</CardTitle>
                    <CardDescription className="mb-2 text-2xl">{participant.candidate.name}</CardDescription>
                </CardHeader>
            </CardContent>
        </Card>
    );
};
