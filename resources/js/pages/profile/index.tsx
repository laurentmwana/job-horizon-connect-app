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

const title = 'Mon profil';

const Page: React.FC = () => {
    const { auth } = usePage<SharedData>().props;
    const { params } = useParams<{ tab?: string }>();

    const activatedTab = Object.values(TABS_SELECT).find((t) => t === params.tab) ?? TABS_SELECT.INFO;
    const candidate = auth.user.candidate;

    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container py-12" aria-label="Espace profil utilisateur">
                <Heading title={title}>
                    Gérez vos informations personnelles, votre mot de passe et consultez les détails liés à votre profil candidat.
                </Heading>

                <div className="mb-4">
                    <ProfileTabs tabSelected={activatedTab} />
                </div>

                {activatedTab === TABS_SELECT.INFO && (
                    <div className="grid gap-6">
                        <ProfileUserInfoForm user={auth.user} />
                        <ProfileUserPassword />
                        {(auth.guard.is_anonymous || auth.guard.is_candidate) && <ProfileUserDeleteAccountForm />}
                    </div>
                )}

                {activatedTab === TABS_SELECT.CANDIDATE && (
                    <div className="grid gap-6">
                        {candidate ? (
                            <CandidateDetails candidate={candidate} />
                        ) : (
                            <p className="text-muted-foreground">Aucune information de candidature disponible pour le moment.</p>
                        )}
                    </div>
                )}
            </div>
        </BaseLayout>
    );
};

export default Page;
