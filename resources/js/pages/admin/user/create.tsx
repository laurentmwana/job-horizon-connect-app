import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { UserForm } from '@/shared/user/user-form';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'Création Utilisateur';

const Page: React.FC = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire de création utilisateur">
                <Heading title={title}>Ajoutez un nouvel utilisateur et gérez facilement ses accès au système.</Heading>
                <div className="max-w-5xl">
                    <UserForm />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
