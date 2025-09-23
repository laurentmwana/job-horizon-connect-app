'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago, formatDate } from '@/lib/date-time';
import { excerpt, isDateExpired } from '@/lib/utils';
import { local } from '@/routes/storage';
import type { Activity } from '@/types/model';
import { router } from '@inertiajs/react';
import { CalendarDays, Clock, ImageIcon } from 'lucide-react';
import type React from 'react';
import { ActivityParticipatedButton } from './activivity-participated';

type ActivityCollectionProps = { activity: Activity };

export const ActivityCollection: React.FC<ActivityCollectionProps> = ({ activity }) => {
    const isExpired = isDateExpired(activity.end_at);

    return (
        <Card className="group flex h-full flex-col overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative overflow-hidden">
                {activity.image ? (
                    <img
                        src={local({ path: activity.image || '/placeholder.svg' }).url}
                        alt={activity.title || 'Activity image'}
                        className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-muted to-muted/50">
                        <div className="flex h-full items-center justify-center">
                            <ImageIcon size={48} className="text-muted-foreground/60" />
                        </div>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <Badge variant={isExpired ? 'destructive' : 'default'} className="shadow-sm">
                        {isExpired ? 'Expirée' : 'En cours'}
                    </Badge>
                </div>
            </div>

            <CardHeader className="flex-1 space-y-3 p-4">
                <Badge variant="outline" className="w-fit text-xs">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {formatDate(activity.start_at)} - {formatDate(activity.end_at)}
                </Badge>

                <div className="space-y-2">
                    <CardTitle className="line-clamp-2 text-lg leading-tight">{excerpt(activity.title, 50)}</CardTitle>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed">{excerpt(activity.description, 120)}</CardDescription>
                </div>

                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Publié il y a {ago(activity.created_at)}
                </p>
            </CardHeader>

            <CardFooter className="flex items-center justify-between gap-3 p-4 pt-0">
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => router.get(`/activity/${activity.id}`)}
                        size="sm"
                        variant="ghost"
                        className="h-8 px-3 text-xs hover:bg-primary/10"
                    >
                        <ImageIcon className="mr-1 h-3 w-3" />
                        Voir détails
                    </Button>
                    <ActivityParticipatedButton activity={activity} />
                </div>
            </CardFooter>
        </Card>
    );
};

type ActivityDetailsProps = { activity: Activity };

export const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activity }) => {
    const isExpired = isDateExpired(activity.end_at);

    return (
        <Card className="overflow-hidden border-0 pt-0">
            <div className="relative">
                {activity.image ? (
                    <img
                        src={local({ path: activity.image || '/placeholder.svg' }).url}
                        alt={activity.title}
                        className="aspect-[21/9] w-full object-cover"
                    />
                ) : (
                    <div className="aspect-[21/9] w-full bg-gradient-to-br from-primary/10 via-muted to-primary/5">
                        <div className="flex h-full items-center justify-center">
                            <ImageIcon size={80} className="text-muted-foreground/40" />
                        </div>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <CardContent className="space-y-6 p-6 lg:p-8">
                <CardHeader className="space-y-4 p-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <CardTitle className="text-2xl leading-tight font-bold text-balance lg:text-3xl">{activity.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs">
                                {activity.type}
                            </Badge>
                            <Badge variant={isExpired ? 'destructive' : 'default'}>{isExpired ? 'Expirée' : 'En cours'}</Badge>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <span className="font-medium">Début:</span>
                            <span>{formatDate(activity.start_at)}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">Fin:</span>
                            <span>{formatDate(activity.end_at)}</span>
                        </div>
                        <ActivityParticipatedButton activity={activity} className="ml-auto" />
                    </div>
                </CardHeader>

                {activity.description && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">Description</h3>
                        <p className="leading-relaxed text-muted-foreground">{activity.description}</p>
                    </div>
                )}

                {activity.content && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">Contenu détaillé</h3>
                        <div
                            className="prose prose-sm dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 max-w-none"
                            dangerouslySetInnerHTML={{ __html: activity.content }}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export const ActivityAdminDetails: React.FC<ActivityDetailsProps> = ({ activity }) => {
    const isExpired = isDateExpired(activity.end_at);

    return (
        <Card className="overflow-hidden border-0 pt-0 shadow-lg">
            <div className="relative">
                {activity.image ? (
                    <img
                        src={local({ path: activity.image || '/placeholder.svg' }).url}
                        alt={activity.title}
                        className="aspect-[21/9] w-full object-cover"
                    />
                ) : (
                    <div className="aspect-[21/9] w-full bg-gradient-to-br from-primary/10 via-muted to-primary/5">
                        <div className="flex h-full items-center justify-center">
                            <ImageIcon size={80} className="text-muted-foreground/40" />
                        </div>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        Vue administrateur
                    </Badge>
                </div>
            </div>

            <CardContent className="space-y-6 p-6 lg:p-8">
                <CardHeader className="space-y-4 p-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <CardTitle className="text-2xl leading-tight font-bold text-balance lg:text-3xl">{activity.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs">
                                {activity.type}
                            </Badge>
                            <Badge variant={isExpired ? 'destructive' : 'default'}>{isExpired ? 'Expirée' : 'En cours'}</Badge>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <span className="font-medium">Début:</span>
                            <span>{formatDate(activity.start_at)}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">Fin:</span>
                            <span>{formatDate(activity.end_at)}</span>
                        </div>
                    </div>
                </CardHeader>

                {activity.description && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">Description</h3>
                        <p className="leading-relaxed text-muted-foreground">{activity.description}</p>
                    </div>
                )}

                {activity.content && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">Contenu détaillé</h3>
                        <div
                            className="prose prose-sm dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 max-w-none"
                            dangerouslySetInnerHTML={{ __html: activity.content }}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
