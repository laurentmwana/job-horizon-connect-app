import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { Candidate } from '@/types/model';
import { router } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';
import React from 'react';

type CandidateCollectionProps = { candidate: Candidate };

export const CandidateCollection: React.FC<CandidateCollectionProps> = ({ candidate }) => {
    return (
        <Card className="flex h-full flex-col pt-0">
            <CardHeader>
                <CardTitle>{excerpt(candidate.name, 40)}</CardTitle>
                <CardDescription className="mb-1">{excerpt(candidate.firstname, 100)}</CardDescription>

                <p className="text-xs text-muted-foreground">Publié il y a {ago(candidate.created_at)}</p>
            </CardHeader>

            <CardFooter className="mt-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button onClick={() => router.get(`/candidate/${candidate.id}`)} size="sm" variant="outline" className="flex items-center gap-1">
                        <InfoIcon size={15} />
                        <span>Détails</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

type CandidateDetailsProps = { candidate: Candidate };

export const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border pt-0 shadow-md">
            <CardContent className="space-y-4 p-6">
                <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-2xl">{candidate.name}</CardTitle>
                </CardHeader>
            </CardContent>
        </Card>
    );
};

export const CandidatelAdminDetails: React.FC<CandidateDetailsProps> = ({ candidate }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border pt-0 shadow-md">
            <CardContent className="space-y-4 p-6">
                <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-2xl">{candidate.name}</CardTitle>
                    <CardDescription className="mb-2 text-2xl">{candidate.firstname}</CardDescription>
                </CardHeader>
            </CardContent>
        </Card>
    );
};
