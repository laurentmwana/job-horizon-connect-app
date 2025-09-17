import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { SkillAdminDetails } from '@/shared/skill/skill-card';
import { Skill } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'En savoir plus sur une compétence';

type Props = {
    skill: Skill;
};

const Page: React.FC<Props> = ({ skill }) => {
    return (
        <AdminLayout>
            <Head title={title} />

            <div className="container py-12">
                <Heading title={title}>Découvrez tous les détails et participez en quelques clics.</Heading>

                <SkillAdminDetails skill={skill} />
            </div>
        </AdminLayout>
    );
};
export default Page;
