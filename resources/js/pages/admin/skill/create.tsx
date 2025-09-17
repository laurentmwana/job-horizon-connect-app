import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { SkillForm } from '@/shared/skill/skill-form';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Création d'une compétence";

type Props = {};

const Page: React.FC<Props> = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Ajouter une activité pour facilement les activités publiées dans la plateforme...</Heading>
            <div className="max-w-5xl">
                <SkillForm />
            </div>
        </AdminLayout>
    );
};
export default Page;
