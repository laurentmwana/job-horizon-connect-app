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

type Props = { skills: PaginationData<Skill> };

const title = 'Gestions compétences';

const Page: React.FC<Props> = ({ skills }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Gérer facilement les activités publiées dans la plateforme...</Heading>
            <div className="mb-4 flex justify-between gap-4">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/skill/create">
                        <Plus size={15} />
                    </Link>
                </Button>
            </div>
            <SkillsTable skills={skills.data} />
            <Pagination items={skills} />
        </AdminLayout>
    );
};
export default Page;
