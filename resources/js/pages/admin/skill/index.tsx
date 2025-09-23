import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { AdminLayout } from '@/layouts/admin-layout';
import { SkillsTable } from '@/shared/skill/skill-table';
import { Skill } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = {
    skills: PaginationData<Skill>;
};

const title = 'Gestion des compétences';

const Page: React.FC<Props> = ({ skills }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Section d'administration des compétences">
                <Heading title={title}>
                    Gérez les compétences disponibles sur la plateforme : ajoutez, modifiez ou supprimez les éléments pour structurer les profils.
                </Heading>

                <div className="mb-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/skill/create">
                            <Plus size={15} className="mr-2" />
                            Nouvelle compétence
                        </Link>
                    </Button>
                </div>

                <SkillsTable skills={skills.data} />
                <Pagination items={skills} />
            </div>
        </AdminLayout>
    );
};

export default Page;
