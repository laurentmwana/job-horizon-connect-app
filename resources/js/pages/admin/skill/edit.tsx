import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { SkillForm } from '@/shared/skill/skill-form';
import { Skill } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Edition d'une compétence";

type Props = {
    skill: Skill;
};

const Page: React.FC<Props> = ({ skill }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Editer une activité pour facilement les activités publiées dans la plateforme...</Heading>
            <div className="max-w-5xl">
                <SkillForm skill={skill} />
            </div>
        </AdminLayout>
    );
};
export default Page;
