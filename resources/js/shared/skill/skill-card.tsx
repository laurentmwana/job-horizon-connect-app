import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { Skill } from '@/types/model';
import { router } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';
import React from 'react';

type SkillCollectionProps = { skill: Skill };

export const SkillCollection: React.FC<SkillCollectionProps> = ({ skill }) => {
    return (
        <Card className="flex h-full flex-col pt-0">
            <CardHeader>
                <CardTitle>{excerpt(skill.name, 40)}</CardTitle>
                <CardDescription className="mb-1">{excerpt(skill.description, 100)}</CardDescription>

                <p className="text-xs text-muted-foreground">Publié il y a {ago(skill.created_at)}</p>
            </CardHeader>

            <CardFooter className="mt-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button onClick={() => router.get(`/skill/${skill.id}`)} size="sm" variant="outline" className="flex items-center gap-1">
                        <InfoIcon size={15} />
                        <span>Détails</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

type SkillDetailsProps = { skill: Skill };

export const SkillDetails: React.FC<SkillDetailsProps> = ({ skill }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border pt-0 shadow-md">
            <CardContent className="space-y-4 p-6">
                <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-2xl">{skill.name}</CardTitle>
                </CardHeader>
            </CardContent>
        </Card>
    );
};

export const SkillAdminDetails: React.FC<SkillDetailsProps> = ({ skill }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border pt-0 shadow-md">
            <CardContent className="space-y-4 p-6">
                <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-2xl">{skill.name}</CardTitle>
                </CardHeader>

                {skill.description && <p className="text-gray-700 dark:text-gray-300">{skill.description}</p>}
            </CardContent>
        </Card>
    );
};
