import { Heading } from '@/components/heading';
import { BaseLayout } from '@/layouts/base-layout';
import { Head } from '@inertiajs/react';
import { ContactForm } from './contact-form';
import { ContactInfo } from './contact-info';

const Page = () => {
    return (
        <BaseLayout>
            <Head title="Nous contacter" />
            <div className="container py-12">
                <Heading title="Nous contacter">
                    Une question, une suggestion ou un retour à nous faire ? N’hésitez pas à nous écrire, nous sommes à votre écoute.
                </Heading>

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div>
                        <ContactInfo />
                    </div>
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};
export default Page;
