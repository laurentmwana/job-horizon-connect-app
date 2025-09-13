import { BaseLayout } from '@/layouts/base-layout';
import { WelcomeHero } from '@/shared/welcome/hero';
import { Offer } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';
import { WelcomeOffers } from '../shared/welcome/offers';

type Props = { offers: Offer[] };

const Welcome: React.FC<Props> = ({ offers }) => {
    return (
        <BaseLayout>
            <Head title="Accueil" />
            <WelcomeHero />
            <WelcomeOffers offers={offers} />
        </BaseLayout>
    );
};

export default Welcome;
