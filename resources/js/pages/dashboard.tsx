import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = {};

const Page: React.FC<Props> = () => {
    return (
        <AdminLayout>
            <Head title="Tableau de bord" />

            <Heading title="Tableau de bord">Tableau de bord</Heading>
        </AdminLayout>
    );
};

export default Page;
