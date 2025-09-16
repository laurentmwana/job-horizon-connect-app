import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { JobPosition } from '@/types/model';
import { router } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';
import React from 'react';

type JobPositionCollectionProps = { jobPosition: JobPosition };

export const JobPositionCollection: React.FC<JobPositionCollectionProps> = ({ jobPosition }) => {
    return (
        <Card className="flex h-full flex-col pt-0">
            <CardHeader>
                <CardTitle>{excerpt(jobPosition.name, 40)}</CardTitle>
                <CardDescription className="mb-1">{excerpt(jobPosition.description, 100)}</CardDescription>

                <p className="text-xs text-muted-foreground">Publié il y a {ago(jobPosition.created_at)}</p>
            </CardHeader>

            <CardFooter className="mt-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => router.get(`/job-position/${jobPosition.id}`)}
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

type JobPositionDetailsProps = { jobPosition: JobPosition };

export const JobPositionDetails: React.FC<JobPositionDetailsProps> = ({ jobPosition }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border pt-0 shadow-md">
            <CardContent className="space-y-4 p-6">
                <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-2xl">{jobPosition.name}</CardTitle>
                </CardHeader>
            </CardContent>
        </Card>
    );
};

export const JobPositionAdminDetails: React.FC<JobPositionDetailsProps> = ({ jobPosition }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border pt-0 shadow-md">
            <CardContent className="space-y-4 p-6">
                <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-2xl">{jobPosition.name}</CardTitle>
                </CardHeader>

                {jobPosition.description && <p className="text-gray-700 dark:text-gray-300">{jobPosition.description}</p>}
            </CardContent>
        </Card>
    );
};
