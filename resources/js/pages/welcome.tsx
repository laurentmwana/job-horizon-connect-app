import { BaseLayout } from '@/layouts/base-layout';
import { WelcomeHero } from '@/shared/welcome/hero';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = {};

const Welcome: React.FC<Props> = () => {
    return (
        <BaseLayout>
            <Head title="Accueil" />
            <WelcomeHero />
        </BaseLayout>
    );
};

export default Welcome;
