import { BaseLayout } from '@/layouts/base-layout';
import { WelcomeActivities } from '@/shared/welcome/activities';
import { WelcomeHero } from '@/shared/welcome/hero';
import { SharedData } from '@/types';
import { Activity, Offer } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import { WelcomeOffers } from '../shared/welcome/offers';

type Props = { activities: Activity[]; offers: Offer[] };

const Welcome: React.FC<Props> = ({ activities, offers }) => {
    const {auth} = usePage<SharedData>().props
    return (
        <BaseLayout>
            <Head title="Accueil" />
            <WelcomeHero />
            <WelcomeOffers offers={offers} user={auth.user} />
            <WelcomeActivities activities={activities} />
        </BaseLayout>
    );
};

export default Welcome;
