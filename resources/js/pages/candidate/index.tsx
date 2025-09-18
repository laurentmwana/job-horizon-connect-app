import { Heading } from '@/components/heading';
import { BaseLayout } from '@/layouts/base-layout';
import { CandidateCompletedForm } from '@/shared/candidate/candidate-form';
import { Head } from '@inertiajs/react';

const title = 'Complèter vos informations';

const Page = () => {
    return (
        <BaseLayout>
            <Head title={title} />
            <div className="container py-12">
                <Heading title={title}>
                    Une question, une suggestion ou un retour à nous faire ? N’hésitez pas à nous écrire, nous sommes à votre écoute.
                </Heading>

                <div className="max-w-4xl">
                    <CandidateCompletedForm />
                </div>
            </div>
        </BaseLayout>
    );
};
export default Page;
