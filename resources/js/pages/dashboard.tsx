import { BaseLayout } from '@/layouts/base-layout';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = {};

const Page: React.FC<Props> = () => {
    return (
        <BaseLayout>
            <Head title="Tableau de bord" />
        </BaseLayout>
    );
};

export default Page;
