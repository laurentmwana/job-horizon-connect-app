import { Heading } from '@/components/heading';
import { BaseLayout } from '@/layouts/base-layout';
import { CandidateCompletedForm } from '@/shared/candidate/candidate-form';
import { Head } from '@inertiajs/react';

const title = 'Compléter vos informations';

const Page = () => {
    return (
        <BaseLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire de complétion du profil candidat">
                <Heading title={title}>
                    Veuillez renseigner les informations manquantes pour finaliser votre profil et accéder aux opportunités proposées.
                </Heading>

                <div className="max-w-4xl">
                    <CandidateCompletedForm />
                </div>
            </div>
        </BaseLayout>
    );
};

export default Page;
