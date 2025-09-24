import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { FaqForm } from '@/shared/faq/faq-form';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'Création FAQ';

const Page: React.FC = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire de création FAQ">
                <Heading title={title}>
                    Ajoutez une nouvelle question-réponse pour enrichir votre base de connaissances et faciliter l’accompagnement des utilisateurs.
                </Heading>
                <div className="max-w-5xl">
                    <FaqForm />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
