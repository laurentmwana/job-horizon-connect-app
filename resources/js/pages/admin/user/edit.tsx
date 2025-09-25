import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { UserForm } from '@/shared/user/user-form';
import { User } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'Édition Utilisateur';

type Props = { user: User };

const Page: React.FC<Props> = ({ user }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire d’édition utilisateur">
                <Heading title={title}>Modifiez les informations de l’utilisateur et mettez à jour ses accès au système.</Heading>
                <div className="max-w-5xl">
                    <UserForm user={user} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
