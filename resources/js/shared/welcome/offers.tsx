import { HeadingLarge } from '@/components/heading';
import { User } from '@/types';
import { Offer } from '@/types/model';
import React from 'react';
import { OfferCollection } from '../offer/offer-card';

type Props = { offers: Offer[], user?: User };

export const WelcomeOffers: React.FC<Props> = ({ offers, user }) => {

    
    if (offers.length === 0) return null;

    return (
        <div className="container py-10 lg:py-12">
            <HeadingLarge title="Dernières offres" className="mb-8 text-center">
                Trouvez en un clin d’œil les opportunités récentes publiées par nos recruteurs et donnez <br /> un nouvel élan à votre parcours
                professionnel.
            </HeadingLarge>

            <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
                {offers.map((offer) => (
                    <div key={offer.id} className="h-full">
                        <OfferCollection offer={offer} candidate={user ? user.candidate : null} />
                    </div>
                ))}
            </div>
        </div>
    );
};
