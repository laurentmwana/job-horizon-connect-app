import { Link } from '@inertiajs/react';
import React from 'react';

export const TABS_SELECT = {
    INFO: 'info',
    CANDIDATE: 'candidate',
} as const;

type TabKey = (typeof TABS_SELECT)[keyof typeof TABS_SELECT];

type Props = {
    tabSelected: TabKey;
};

export const ProfileTabs: React.FC<Props> = ({ tabSelected }) => {
    const baseClass =
        'rounded-md px-3 py-2 text-sm font-medium hover:text-primary data-[active=true]:border-b-2 data-[active=true]:border-primary data-[active=true]:text-primary';

    return (
        <div className="flex items-center gap-4 border-b border-muted pb-2" aria-label="Navigation des onglets du profil">
            <Link href="/profile?tab=info" className={baseClass} data-active={tabSelected === TABS_SELECT.INFO}>
                Authentification
            </Link>

            <Link href="/profile?tab=candidate" className={baseClass} data-active={tabSelected === TABS_SELECT.CANDIDATE}>
                Candidat(e)
            </Link>
        </div>
    );
};
