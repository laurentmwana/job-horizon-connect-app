import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago, formatDate } from '@/lib/date-time';
import { excerpt, isDateExpired } from '@/lib/utils';
import { local } from '@/routes/storage';
import { Offer } from '@/types/model';
import { router } from '@inertiajs/react';
import { CalendarDays, Clock, Image, InfoIcon, PenIcon } from 'lucide-react';
import React from 'react';

type OfferCollectionProps = { offer: Offer };

export const OfferCollection: React.FC<OfferCollectionProps> = ({ offer }) => {
    const isExpired = isDateExpired(offer.end_at);
    return (
        <Card className="flex h-full flex-col pt-0">
            <div>
                {offer.image ? (
                    <img src={local({ path: offer.image }).url} alt="default image" className="h-40 w-full rounded-t-2xl object-cover" />
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
                        Du {formatDate(offer.start_at)} - {formatDate(offer.end_at)}
                    </Badge>
                </div>
                <CardTitle>{excerpt(offer.name, 40)}</CardTitle>
                <CardDescription className="mb-1">{excerpt(offer.bio, 100)}</CardDescription>
                <p className="text-xs text-muted-foreground">Publié il y a {ago(offer.created_at)}</p>
            </CardHeader>

            <CardFooter className="mt-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button onClick={() => router.get(`/offer/${offer.id}`)} size="sm" variant="outline" className="flex items-center gap-1">
                        <InfoIcon size={15} />
                        <span>Détails</span>
                    </Button>
                    <Button size="sm" variant="secondary" className="flex items-center gap-1">
                        <PenIcon size={15} />
                        <span>Postuler</span>
                    </Button>
                </div>

                {isExpired ? <Badge variant="destructive">Expirée</Badge> : <Badge variant="secondary">En cours</Badge>}
            </CardFooter>
        </Card>
    );
};

type OfferDetailsProps = { offer: Offer };

export const OfferDetails: React.FC<OfferDetailsProps> = ({ offer }) => {
    const isExpired = isDateExpired(offer.end_at);

    return (
        <Card className="overflow-hidden pt-0">
            {/* Image */}
            <div>
                {offer.image ? (
                    <img src={local({ path: offer.image }).url} alt={offer.name} className="h-80 w-full object-cover" />
                ) : (
                    <div className="flex h-80 w-full items-center justify-center bg-accent">
                        <Image size={80} />
                    </div>
                )}
            </div>

            <CardHeader>
                <CardTitle className="text-2xl font-bold">{offer.name}</CardTitle>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">
                        Du {formatDate(offer.start_at)} au {formatDate(offer.end_at)}
                    </Badge>
                    {isExpired ? <Badge variant="destructive">Expirée</Badge> : <Badge variant="secondary">En cours</Badge>}
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-xs text-muted-foreground">Publié il y a {ago(offer.created_at)}</p>
                    <Button
                        disabled={isExpired}
                        size="sm"
                        variant="link"
                        className="flex items-center gap-2 text-xs"
                        onClick={() => router.get(`/offer/${offer.id}/apply`)}
                    >
                        Postuler
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {offer.bio && <p className="text-gray-700 dark:text-gray-300">{offer.bio}</p>}

                {offer.description && <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: offer.description }} />}
            </CardContent>
        </Card>
    );
};

export const OfferAdminDetails: React.FC<OfferDetailsProps> = ({ offer }) => {
    const isExpired = isDateExpired(offer.end_at);

    return (
        <Card className="overflow-hidden rounded-2xl border pt-0 shadow-md">
            {/* Image */}
            <div>
                {offer.image ? (
                    <img src={local({ path: offer.image }).url} alt={offer.name} className="h-80 w-full object-cover" />
                ) : (
                    <div className="flex h-80 w-full items-center justify-center bg-accent">
                        <Image size={80} />
                    </div>
                )}
            </div>

            <CardContent className="space-y-4 p-6">
                <CardHeader className="p-0">
                    <CardTitle className="mb-2 text-2xl">{offer.name}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>{formatDate(offer.start_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(offer.end_at)}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Badge variant={isExpired ? 'destructive' : 'outline'}>{isExpired ? 'Expirée' : 'En cours'}</Badge>
                        </div>
                    </div>
                </CardHeader>

                {offer.bio && <p className="text-gray-700 dark:text-gray-300">{offer.bio}</p>}

                {offer.description && <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: offer.description }} />}
            </CardContent>
        </Card>
    );
};
