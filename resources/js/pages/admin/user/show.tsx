import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { UserDetails } from '@/shared/user/user-card';
import { User } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'En savoir plus sur un utilisateur';

type Props = {
    user: User;
};

const Page: React.FC<Props> = ({ user }) => {
    return (
        <AdminLayout>
            <Head title={title} />

            <div className="container py-12" aria-label="Détails administratifs d'un utilisateur">
                <Heading title={title}>Consultez toutes les informations relatives à cet utilisateur.</Heading>

                <UserDetails user={user} />
            </div>
        </AdminLayout>
    );
};

export default Page;
