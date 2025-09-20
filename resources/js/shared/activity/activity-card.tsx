import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago, formatDate } from '@/lib/date-time';
import { excerpt, isDateExpired } from '@/lib/utils';
import { local } from '@/routes/storage';
import { Activity } from '@/types/model';
import { router } from '@inertiajs/react';
import { CalendarDays, Clock, Image } from 'lucide-react';
import React from 'react';
import { ActivityParticipatedButton } from './activivity-participated';

type ActivityCollectionProps = { activity: Activity };

export const ActivityCollection: React.FC<ActivityCollectionProps> = ({ activity }) => {
    const isExpired = isDateExpired(activity.end_at);
    return (
        <Card className="flex h-full flex-col pt-0">
            <div>
                {activity.image ? (
                    <img src={local({ path: activity.image }).url} alt="default image" className="h-40 w-full rounded-t-2xl object-cover" />
                ) : (
                    <div className="h-40 w-full rounded-t-2xl bg-accent">
                        <div className="flex h-full items-center justify-center">
                            <Image size={60} />
                        </div>
                    </div>
                )}
            </div>

            <CardHeader>
                <div className="mb-2">
                    <Badge variant="secondary">
                        Du {formatDate(activity.start_at)} - {formatDate(activity.end_at)}
                    </Badge>
                </div>
                <CardTitle>{excerpt(activity.title, 40)}</CardTitle>
                <CardDescription className="mb-1">{excerpt(activity.description, 100)}</CardDescription>
                <p className="text-xs text-muted-foreground">Publié il y a {ago(activity.created_at)}</p>
            </CardHeader>

            <CardFooter className="mt-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button onClick={() => router.get(`/activity/${activity.id}`)} size="sm" variant="link" className="flex items-center gap-1">
                        <span>Voir</span>
                    </Button>
                    <ActivityParticipatedButton activity={activity} />
                </div>

                {isExpired ? <Badge variant="destructive">Expirée</Badge> : <Badge variant="secondary">En cours</Badge>}
            </CardFooter>
        </Card>
    );
};

type ActivityDetailsProps = { activity: Activity };

export const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activity }) => {
    const isExpired = isDateExpired(activity.end_at);

    return (
        <Card className="overflow-hidden rounded-2xl border pt-0 shadow-md">
            {/* Image */}
            <div>
                {activity.image ? (
                    <img src={local({ path: activity.image }).url} alt={activity.title} className="h-80 w-full object-cover" />
                ) : (
                    <div className="flex h-80 w-full items-center justify-center bg-accent">
                        <Image size={80} />
                    </div>
                )}
            </div>

            <CardContent className="space-y-4 p-6">
                <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-2xl">{activity.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>{formatDate(activity.start_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(activity.end_at)}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Badge variant="secondary">{activity.type}</Badge>
                            <Badge variant={isExpired ? 'destructive' : 'outline'}>{isExpired ? 'Expirée' : 'En cours'}</Badge>
                          <ActivityParticipatedButton activity={activity} className='text-xs' />
                        </div>
                    </div>
                </CardHeader>

                {activity.description && <p className="text-gray-700 dark:text-gray-300">{activity.description}</p>}

                {activity.content && <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: activity.content }} />}
            </CardContent>
        </Card>
    );
};

export const ActivityAdminDetails: React.FC<ActivityDetailsProps> = ({ activity }) => {
    const isExpired = isDateExpired(activity.end_at);

    return (
        <Card className="overflow-hidden rounded-2xl border pt-0 shadow-md">
            {/* Image */}
            <div>
                {activity.image ? (
                    <img src={local({ path: activity.image }).url} alt={activity.title} className="h-80 w-full object-cover" />
                ) : (
                    <div className="flex h-80 w-full items-center justify-center bg-accent">
                        <Image size={80} />
                    </div>
                )}
            </div>

            <CardContent className="space-y-4 p-6">
                <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-2xl">{activity.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>{formatDate(activity.start_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(activity.end_at)}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Badge variant="secondary">{activity.type}</Badge>
                            <Badge variant={isExpired ? 'destructive' : 'outline'}>{isExpired ? 'Expirée' : 'En cours'}</Badge>
                        </div>
                    </div>
                </CardHeader>

                {activity.description && <p className="text-gray-700 dark:text-gray-300">{activity.description}</p>}

                {activity.content && <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: activity.content }} />}
            </CardContent>
        </Card>
    );
};
