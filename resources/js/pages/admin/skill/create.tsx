import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { SkillForm } from '@/shared/skill/skill-form';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Création d'une compétence";

const Page: React.FC = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire de création de compétence">
                <Heading title={title}>
                    Ajoutez une nouvelle compétence pour enrichir les profils et améliorer la précision des évaluations sur la plateforme.
                </Heading>
                <div className="max-w-5xl">
                    <SkillForm />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
