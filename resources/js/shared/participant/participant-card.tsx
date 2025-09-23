'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import type { Participant } from '@/types/model';
import { router } from '@inertiajs/react';
import { CalendarIcon, InfoIcon, UserIcon } from 'lucide-react';
import type React from 'react';

type ParticipantCollectionProps = { participant: Participant };

export const ParticipantCollection: React.FC<ParticipantCollectionProps> = ({ participant }) => {
    return (
        <Card className="group flex h-full flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <UserIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg leading-tight">{excerpt(participant.candidate.name, 40)}</CardTitle>
                        <CardDescription className="mt-1 text-sm">{excerpt(participant.activity.title, 100)}</CardDescription>
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-1 border-t border-border/50 pt-3">
                    <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Publié il y a {ago(participant.created_at)}</p>
                </div>
            </CardHeader>

            <CardFooter className="mt-auto pt-0">
                <Button
                    onClick={() => router.get(`/participant/${participant.id}`)}
                    size="sm"
                    variant="outline"
                    className="w-full transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground"
                >
                    <InfoIcon className="mr-2 h-4 w-4" />
                    Voir les détails
                </Button>
            </CardFooter>
        </Card>
    );
};

type ParticipantDetailsProps = { participant: Participant };

export const ParticipantAdminDetails: React.FC<ParticipantDetailsProps> = ({ participant }) => {
    return (
        <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                        <UserIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <CardTitle className="mb-2 text-2xl font-bold text-foreground">{participant.candidate.name}</CardTitle>
                        <CardDescription className="text-base text-muted-foreground">
                            Participant à l'activité: {participant.activity.title}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <div className="grid gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Inscrit il y a {ago(participant.created_at)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-green-700">Participant actif</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
