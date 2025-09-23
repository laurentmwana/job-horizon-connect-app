'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago, formatDate } from '@/lib/date-time';
import { isDateExpired } from '@/lib/utils';
import { local } from '@/routes/storage';
import type { Candidate, Offer } from '@/types/model';
import { router } from '@inertiajs/react';
import { CalendarDays, Clock, ImageIcon } from 'lucide-react';
import type React from 'react';
import { OfferCandidacy } from './offer-candidacy';

type OfferCollectionProps = { offer: Offer; candidate: Candidate | null };

export const OfferCollection: React.FC<OfferCollectionProps> = ({ offer, candidate }) => {
    const isExpired = isDateExpired(offer.end_at);
    return (
        <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative overflow-hidden">
                {offer.image ? (
                    <img
                        src={local({ path: offer.image || '/placeholder.svg' }).url}
                        alt={offer.name || 'Offer image'}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-muted to-muted/60">
                        <div className="flex h-full items-center justify-center">
                            <ImageIcon size={48} className="text-muted-foreground/60" />
                        </div>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    {isExpired ? (
                        <Badge variant="destructive" className="shadow-md">
                            Expirée
                        </Badge>
                    ) : (
                        <Badge variant="secondary" className="bg-background/90 shadow-md backdrop-blur-sm">
                            En cours
                        </Badge>
                    )}
                </div>
            </div>

            <CardHeader className="flex-1 space-y-3">
                <Badge variant="outline" className="w-fit text-xs">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    Du {formatDate(offer.start_at)} - {formatDate(offer.end_at)}
                </Badge>

                <div className="space-y-2">
                    <CardTitle className="line-clamp-2 text-lg leading-tight">{offer.name}</CardTitle>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed">{offer.bio}</CardDescription>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Publié il y a {ago(offer.created_at)}</span>
                </div>
            </CardHeader>

            <CardFooter className="border-t bg-muted/30 p-4">
                <div className="flex w-full items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Button onClick={() => router.get(`/offer/${offer.id}`)} size="sm" variant="ghost" className="h-8 px-3 hover:bg-primary/10">
                            <ImageIcon className="mr-1 h-3 w-3" />
                            Voir
                        </Button>
                        {candidate && <OfferCandidacy offer={offer} />}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

type OfferDetailsProps = { offer: Offer; candidate: Candidate | null };

export const OfferDetails: React.FC<OfferDetailsProps> = ({ offer, candidate }) => {
    const isExpired = isDateExpired(offer.end_at);

    return (
        <Card className="overflow-hidden pt-0">
            <div className="relative">
                {offer.image ? (
                    <img src={local({ path: offer.image || '/placeholder.svg' }).url} alt={offer.name} className="h-80 w-full object-cover" />
                ) : (
                    <div className="flex h-80 w-full items-center justify-center bg-gradient-to-br from-muted to-muted/60">
                        <ImageIcon size={80} className="text-muted-foreground/40" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <CardHeader className="space-y-4">
                <div className="space-y-3">
                    <CardTitle className="text-3xl leading-tight font-bold text-balance">{offer.name}</CardTitle>

                    <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="outline" className="px-3 py-1">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            Du {formatDate(offer.start_at)} au {formatDate(offer.end_at)}
                        </Badge>
                        {isExpired ? (
                            <Badge variant="destructive" className="px-3 py-1">
                                <Clock className="mr-1 h-3 w-3" />
                                Expirée
                            </Badge>
                        ) : (
                            <Badge variant="secondary" className="px-3 py-1">
                                <Clock className="mr-1 h-3 w-3" />
                                En cours
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-2">
                    <p className="text-sm text-muted-foreground">Publié il y a {ago(offer.created_at)}</p>
                    {candidate && (
                        <div className="flex items-center gap-2">
                            <OfferCandidacy offer={offer} />
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {offer.bio && (
                    <div className="rounded-lg bg-muted/30 p-4">
                        <p className="leading-relaxed text-foreground/90">{offer.bio}</p>
                    </div>
                )}

                {offer.description && (
                    <div
                        className="prose prose-sm dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground max-w-none"
                        dangerouslySetInnerHTML={{ __html: offer.description }}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export const OfferAdminDetails: React.FC<OfferDetailsProps> = ({ offer }) => {
    const isExpired = isDateExpired(offer.end_at);

    return (
        <Card className="overflow-hidden pt-0">
            <div className="relative">
                {offer.image ? (
                    <img src={local({ path: offer.image || '/placeholder.svg' }).url} alt={offer.name} className="h-80 w-full object-cover" />
                ) : (
                    <div className="flex h-80 w-full items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                        <ImageIcon size={80} className="text-primary/30" />
                    </div>
                )}
            </div>

            <CardContent className="space-y-6 p-8">
                <CardHeader className="space-y-4 p-0">
                    <CardTitle className="text-3xl font-bold text-balance">{offer.name}</CardTitle>

                    <div className="flex flex-wrap items-center gap-6 rounded-lg bg-muted/30 p-4">
                        <div className="flex items-center gap-2 text-sm">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <span className="font-medium">Début:</span>
                            <span>{formatDate(offer.start_at)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">Fin:</span>
                            <span>{formatDate(offer.end_at)}</span>
                        </div>
                        <Badge variant={isExpired ? 'destructive' : 'default'} className="px-3 py-1">
                            {isExpired ? 'Expirée' : 'En cours'}
                        </Badge>
                    </div>
                </CardHeader>

                {offer.bio && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Résumé</h3>
                        <div className="rounded-lg border-l-4 border-primary/30 bg-muted/30 p-4">
                            <p className="leading-relaxed text-foreground/90">{offer.bio}</p>
                        </div>
                    </div>
                )}

                {offer.description && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Description complète</h3>
                        <div
                            className="prose prose-sm dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 max-w-none"
                            dangerouslySetInnerHTML={{ __html: offer.description }}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
