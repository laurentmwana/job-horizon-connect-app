'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago } from '@/lib/date-time';
import type { Candidate } from '@/types/model';
import { router } from '@inertiajs/react';
import { CalendarIcon, ClockIcon, InfoIcon, UserIcon } from 'lucide-react';
import type React from 'react';

type CandidateCollectionProps = { candidate: Candidate };

export const CandidateCollection: React.FC<CandidateCollectionProps> = ({ candidate }) => {
    return (
        <Card className="group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/20 p-2">
                        <UserIcon size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-lg font-semibold">{candidate.name}</h3>
                        <p className="truncate text-sm text-blue-100">{candidate.firstname}</p>
                    </div>
                </div>
            </div>

            <CardContent className="flex-1 p-4">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockIcon size={14} />
                        <span>Créé il y a {ago(candidate.created_at)}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="border-t bg-muted/30 p-4">
                <Button
                    onClick={() => router.get(`/candidate/${candidate.id}`)}
                    size="sm"
                    variant="outline"
                    className="w-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                    <InfoIcon size={15} className="mr-2" />
                    Voir les détails
                </Button>
            </CardFooter>
        </Card>
    );
};

type CandidateDetailsProps = { candidate: Candidate };

export const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-white/20 p-3">
                        <UserIcon size={24} />
                    </div>
                    <div>
                        <CardTitle className="text-2xl text-white">{candidate.name}</CardTitle>
                        <CardDescription className="mt-1 text-lg text-blue-100">{candidate.firstname}</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <div className="space-y-6">
                    <div className="grid gap-4">
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                            <CalendarIcon size={18} className="text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Date de création</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(candidate.created_at).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const CandidateAdminDetails: React.FC<CandidateDetailsProps> = ({ candidate }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-800 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-white/20 p-3">
                        <UserIcon size={24} />
                    </div>
                    <div>
                        <CardTitle className="text-2xl text-white">{candidate.name}</CardTitle>
                        <CardDescription className="mt-1 text-lg text-slate-200">{candidate.firstname}</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <div className="space-y-6">
                    <div className="rounded-lg bg-muted/30 p-4">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                            <InfoIcon size={18} />
                            Informations administratives
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">ID Candidat</p>
                                <p className="rounded border bg-background px-2 py-1 font-mono text-sm">{candidate.id}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Date de création</p>
                                <p className="text-sm">
                                    {new Date(candidate.created_at).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Nom complet</p>
                                <p className="text-sm">
                                    {candidate.firstname} {candidate.name}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Créé il y a</p>
                                <p className="text-sm">{ago(candidate.created_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
