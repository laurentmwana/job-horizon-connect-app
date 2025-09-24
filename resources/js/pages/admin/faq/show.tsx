import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { FaqDetails } from '@/shared/faq/faq-card';
import { Faq } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'Détails d’une FAQ';

type Props = {
    faq: Faq;
};

const Page: React.FC<Props> = ({ faq }) => {
    return (
        <AdminLayout>
            <Head title={title} />

            <div className="container py-12" aria-label="Détails administratifs de la FAQ">
                <Heading title={title}>
                    Consultez toutes les informations relatives à cette question fréquente afin d’en faciliter la gestion et la mise à jour.
                </Heading>

                <FaqDetails faq={faq} />
            </div>
        </AdminLayout>
    );
};

export default Page;
