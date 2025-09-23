import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { ActivityForm } from '@/shared/activity/activity-form';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Création d'une activité";

const Page: React.FC = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire de création d'activité">
                <Heading title={title}>
                    Ajoutez une nouvelle activité pour enrichir les opportunités proposées sur la plateforme et faciliter leur publication.
                </Heading>
                <div className="max-w-5xl">
                    <ActivityForm />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
