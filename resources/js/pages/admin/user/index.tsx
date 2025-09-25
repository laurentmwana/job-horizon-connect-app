import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { AdminLayout } from '@/layouts/admin-layout';
import { UsersTable } from '@/shared/user/user-table';
import { User } from '@/types';
import { PaginationData } from '@/types/paginate';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = {
    users: PaginationData<User>;
};

const title = 'Gestion des Utilisateurs';

const Page: React.FC<Props> = ({ users }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Section d'administration des utilisateurs">
                <Heading title={title}>
                    Gérez les comptes utilisateurs de la plateforme&nbsp;: ajoutez, modifiez ou supprimez des comptes pour administrer les accès.
                </Heading>

                <div className="mb-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/user/create">
                            <Plus size={15} />
                        </Link>
                    </Button>
                </div>

                <UsersTable users={users.data} />
                <Pagination items={users} />
            </div>
        </AdminLayout>
    );
};

export default Page;
