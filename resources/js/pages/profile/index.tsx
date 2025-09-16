import { Heading } from '@/components/heading';
import { BaseLayout } from '@/layouts/base-layout';
import { ProfileUserDeleteAccountForm } from '@/shared/profile/delete-user';
import { ProfileUserInfoForm } from '@/shared/profile/info-form';
import { ProfileUserPassword } from '@/shared/profile/user-password';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

type Props = {};

const title = 'Mon profil';

const Page: React.FC<Props> = ({}) => {
    const { auth } = usePage<SharedData>().props;
    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container py-12">
                <Heading title={title}>Découvrez les offres disponibles et postulez en quelques clics.</Heading>

                <div className="grid gap-6">
                    <ProfileUserInfoForm user={auth.user} />
                    <ProfileUserPassword />
                    {auth.guard.is_anonymous && <ProfileUserDeleteAccountForm user={auth.user} />}
                </div>
            </div>
        </BaseLayout>
    );
};

export default Page;
