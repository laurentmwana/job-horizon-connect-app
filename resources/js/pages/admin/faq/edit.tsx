import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { FaqForm } from '@/shared/faq/faq-form';
import { Faq } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Édition d'une FAQ";

type Props = {
    faq: Faq;
};

const Page: React.FC<Props> = ({ faq }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire d'édition de FAQ">
                <Heading title={title}>
                    Modifiez le contenu de la FAQ afin d’assurer la clarté des informations et d’améliorer l’expérience des utilisateurs.
                </Heading>
                <div className="max-w-5xl">
                    <FaqForm faq={faq} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
