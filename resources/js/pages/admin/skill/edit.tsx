import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { SkillForm } from '@/shared/skill/skill-form';
import { Skill } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Édition d'une compétence";

type Props = {
    skill: Skill;
};

const Page: React.FC<Props> = ({ skill }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire d'édition de compétence">
                <Heading title={title}>
                    Modifiez les informations de la compétence pour garantir leur exactitude et améliorer la gestion des profils sur la plateforme.
                </Heading>
                <div className="max-w-5xl">
                    <SkillForm skill={skill} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
