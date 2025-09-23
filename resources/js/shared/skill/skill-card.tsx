'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import type { Skill } from '@/types/model';
import { router } from '@inertiajs/react';
import { BookOpenIcon, InfoIcon } from 'lucide-react';
import type React from 'react';

type SkillCollectionProps = { skill: Skill };

export const SkillCollection: React.FC<SkillCollectionProps> = ({ skill }) => {
    return (
        <Card className="group flex h-full flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
                        <BookOpenIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg leading-tight transition-colors group-hover:text-primary">{excerpt(skill.name, 40)}</CardTitle>
                        <CardDescription className="mt-2 text-sm leading-relaxed">{excerpt(skill.description, 100)}</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0 pb-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                    <span>Publié il y a {ago(skill.created_at)}</span>
                </div>
            </CardContent>

            <CardFooter className="mt-auto pt-0">
                <Button
                    onClick={() => router.get(`/skill/${skill.id}`)}
                    size="sm"
                    variant="outline"
                    className="w-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                    <InfoIcon className="mr-2 h-4 w-4" />
                    Voir les détails
                </Button>
            </CardFooter>
        </Card>
    );
};

type SkillDetailsProps = { skill: Skill };

export const SkillDetails: React.FC<SkillDetailsProps> = ({ skill }) => {
    return (
        <Card className="overflow-hidden border shadow-sm">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                        <BookOpenIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl text-balance">{skill.name}</CardTitle>
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                            <span>Publié il y a {ago(skill.created_at)}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                {skill.description && (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="leading-relaxed text-foreground/80">{skill.description}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export const SkillAdminDetails: React.FC<SkillDetailsProps> = ({ skill }) => {
    return (
        <Card className="overflow-hidden border shadow-sm">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                        <BookOpenIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-2xl text-balance">{skill.name}</CardTitle>
                        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                                <span>Publié il y a {ago(skill.created_at)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
                {skill.description && (
                    <section>
                        <h3 className="mb-3 text-lg font-semibold text-foreground">Description</h3>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p className="rounded-lg border bg-muted/30 p-4 leading-relaxed text-foreground/80">{skill.description}</p>
                        </div>
                    </section>
                )}

                <section className="border-t pt-6">
                    <h3 className="mb-3 text-lg font-semibold text-foreground">Métadonnées</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <dt className="text-sm font-medium text-muted-foreground">Date de création</dt>
                            <dd className="mt-1 text-sm text-foreground">{new Date(skill.created_at).toLocaleDateString('fr-FR')}</dd>
                        </div>
                    </div>
                </section>
            </CardContent>
        </Card>
    );
};
