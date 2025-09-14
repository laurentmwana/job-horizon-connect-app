import { Heading } from '@/components/heading';
import { BaseLayout } from '@/layouts/base-layout';
import { Head } from '@inertiajs/react';

const Page = () => {
    return (
        <BaseLayout>
            <Head title="A propos" />

            <div className="container py-12">
                <Heading title="A propos de nous"></Heading>
            </div>
        </BaseLayout>
    );
};

export default Page;
