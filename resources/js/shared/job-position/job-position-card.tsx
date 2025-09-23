'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import type { JobPosition } from '@/types/model';
import { router } from '@inertiajs/react';
import { BriefcaseIcon, CalendarIcon, ClockIcon, InfoIcon } from 'lucide-react';
import type React from 'react';

type JobPositionCollectionProps = { jobPosition: JobPosition };

export const JobPositionCollection: React.FC<JobPositionCollectionProps> = ({ jobPosition }) => {
    return (
        <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <BriefcaseIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <Badge variant="secondary" className="mb-1 border-white/30 bg-white/20 text-white">
                            Position
                        </Badge>
                    </div>
                </div>
            </div>

            <CardHeader className="pb-3">
                <CardTitle className="text-lg leading-tight transition-colors group-hover:text-blue-600">{excerpt(jobPosition.name, 40)}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{excerpt(jobPosition.description, 100)}</CardDescription>
            </CardHeader>

            <CardContent className="pt-0 pb-3">
                <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2 text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3" />
                    <span>Publié il y a {ago(jobPosition.created_at)}</span>
                </div>
            </CardContent>

            <CardFooter className="mt-auto pt-0">
                <Button
                    onClick={() => router.get(`/job-position/${jobPosition.id}`)}
                    size="sm"
                    variant="outline"
                    className="w-full transition-all group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700"
                >
                    <InfoIcon className="mr-2 h-4 w-4" />
                    Voir les détails
                </Button>
            </CardFooter>
        </Card>
    );
};

type JobPositionDetailsProps = { jobPosition: JobPosition };

export const JobPositionDetails: React.FC<JobPositionDetailsProps> = ({ jobPosition }) => {
    return (
        <Card className="overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <BriefcaseIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <Badge variant="secondary" className="mb-2 border-white/30 bg-white/20 text-white">
                            Position disponible
                        </Badge>
                        <h1 className="text-2xl font-bold text-white">{jobPosition.name}</h1>
                    </div>
                </div>
            </div>

            <CardContent className="space-y-6 p-6">
                {jobPosition.description && (
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-foreground">Description du poste</h3>
                        <p className="leading-relaxed text-muted-foreground">{jobPosition.description}</p>
                    </div>
                )}

                <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="mb-3 font-medium text-foreground">Informations</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockIcon className="h-4 w-4" />
                        <span>Publié il y a {ago(jobPosition.created_at)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const JobPositionAdminDetails: React.FC<JobPositionDetailsProps> = ({ jobPosition }) => {
    return (
        <Card className="overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r from-slate-600 to-slate-800 p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <BriefcaseIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <Badge variant="secondary" className="mb-2 border-white/30 bg-white/20 text-white">
                            Administration
                        </Badge>
                        <h1 className="text-2xl font-bold text-white">{jobPosition.name}</h1>
                    </div>
                </div>
            </div>

            <CardContent className="space-y-6 p-6">
                {jobPosition.description && (
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-foreground">Description du poste</h3>
                        <div className="rounded-lg bg-muted/30 p-4">
                            <p className="leading-relaxed text-muted-foreground">{jobPosition.description}</p>
                        </div>
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="mb-3 font-medium text-foreground">Informations générales</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <ClockIcon className="h-4 w-4" />
                                <span>Créé il y a {ago(jobPosition.created_at)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="mb-3 font-medium text-foreground">Statut</h4>
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                            Actif
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
