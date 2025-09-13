import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ago, formatDate } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { local } from '@/routes/storage';
import { Offer } from '@/types/model';
import { router } from '@inertiajs/react';
import { Image, InfoIcon, PenIcon } from 'lucide-react';
import React from 'react';
import { isOfferExpired } from '.';

type OfferCollectionProps = { offer: Offer };

export const OfferCollection: React.FC<OfferCollectionProps> = ({ offer }) => {
    const isExpired = isOfferExpired(offer);
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
    const isExpired = isOfferExpired(offer);

    return (
        <Card className="overflow-hidden">
            {/* Image */}
            <div>
                {offer.image ? (
                    <img src={local({ path: offer.image }).url} alt={offer.name} className="h-64 w-full object-cover" />
                ) : (
                    <div className="flex h-64 w-full items-center justify-center bg-accent">
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
                    {isExpired ? <Badge variant="destructive">Expirée</Badge> : <Badge variant="default">En cours</Badge>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Publiée il y a {ago(offer.created_at)}</p>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-base leading-relaxed">{offer.description}</p>

                {/* Recruteur */}
                <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold">Recruteur</h3>
                    <p>
                        {offer.recruiter.firstname} {offer.recruiter.name} <br />
                        📞 {offer.recruiter.phone} | {offer.recruiter.gender === 'male' ? 'Homme' : 'Femme'}
                    </p>
                </div>

                {/* Postuler */}
                {!isExpired && (
                    <div className="pt-6">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="flex items-center gap-2"
                            onClick={() => router.get(`/offer/${offer.id}/apply`)}
                        >
                            <PenIcon size={18} />
                            <span>Postuler</span>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
