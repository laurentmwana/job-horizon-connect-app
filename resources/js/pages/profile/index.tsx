import { Heading } from '@/components/heading';
import { useParams } from '@/hooks/use-params';
import { BaseLayout } from '@/layouts/base-layout';
import { CandidateDetails } from '@/shared/candidate/candidate-card';
import { ProfileUserDeleteAccountForm } from '@/shared/profile/delete-user';
import { ProfileUserInfoForm } from '@/shared/profile/info-form';
import { ProfileTabs, TABS_SELECT } from '@/shared/profile/profile-tabs';
import { ProfileUserPassword } from '@/shared/profile/user-password';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

type Props = {};

const title = 'Mon profil';

const Page: React.FC<Props> = ({}) => {
    const { auth } = usePage<SharedData>().props;

    const { params } = useParams<{ tab?: string }>();

    const activatedTab = Object.values(TABS_SELECT).find((t) => t === params.tab) ?? TABS_SELECT.INFO;
    const candidate = auth.user.candidate;

    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container py-12">
                <Heading title={title}>Découvrez les offres disponibles et postulez en quelques clics.</Heading>
                <div className="mb-4">
                    <ProfileTabs tabSelected={activatedTab} />
                </div>

                {TABS_SELECT.INFO === activatedTab && (
                    <div className="grid gap-6">
                        <ProfileUserInfoForm user={auth.user} />
                        <ProfileUserPassword />
                        {auth.guard.is_anonymous || auth.guard.is_candidate ? <ProfileUserDeleteAccountForm user={auth.user} /> : null}
                    </div>
                )}

                {TABS_SELECT.CANDIDATE === activatedTab && (
                    <div className="grid gap-6">
                        {candidate !== null ? <CandidateDetails candidate={candidate} /> : <p>pas d'informations pour l'instant</p>}
                    </div>
                )}
            </div>
        </BaseLayout>
    );
};

export default Page;
