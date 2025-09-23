import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { CandidateForm } from '@/shared/candidate/candidate-form';
import { Candidate } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Édition d'un(e) candidat(e)";

type Props = {
    candidate: Candidate;
};

const Page: React.FC<Props> = ({ candidate }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire d'édition de candidat">
                <Heading title={title}>
                    Modifiez les informations du/de la candidat(e) pour garantir l’exactitude des données et faciliter le suivi des candidatures.
                </Heading>
                <div className="max-w-5xl">
                    <CandidateForm candidate={candidate} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
