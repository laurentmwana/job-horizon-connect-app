import { BaseLayout } from '@/layouts/base-layout';
import { WelcomeActivities } from '@/shared/welcome/activities';
import { WelcomeHero } from '@/shared/welcome/hero';
import { Activity, Offer } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';
import { WelcomeOffers } from '../shared/welcome/offers';

type Props = { activities: Activity[]; offers: Offer[] };

const Welcome: React.FC<Props> = ({ activities, offers }) => {
    return (
        <BaseLayout>
            <Head title="Accueil" />
            <WelcomeHero />
            <WelcomeOffers offers={offers} />
            <WelcomeActivities activities={activities} />
        </BaseLayout>
    );
};

export default Welcome;
