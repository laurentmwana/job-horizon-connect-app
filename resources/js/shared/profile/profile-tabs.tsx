import { Link } from '@inertiajs/react';
import React from 'react';

export const TABS_SELECT = {
    INFO: 'info',
    CANDIDATE: 'candidate',
};

type Props = { tabSelected: string };

export const ProfileTabs: React.FC<Props> = ({ tabSelected }) => {
    return (
        <div className="flex items-center gap-4 border-b border-muted pb-2">
            <Link
                href="/profile?tab=info"
                className="rounded-md px-3 py-2 text-sm font-medium hover:text-primary data-[active=true]:border-b-2 data-[active=true]:border-primary data-[active=true]:text-primary"
                data-active={tabSelected === TABS_SELECT.INFO}
            >
                Authentification
            </Link>

            <Link
                href="/profile?tab=candidate"
                className="rounded-md px-3 py-2 text-sm font-medium hover:text-primary data-[active=true]:border-b-2 data-[active=true]:border-primary data-[active=true]:text-primary"
                data-active={tabSelected === TABS_SELECT.CANDIDATE}
            >
                Candidat(e)
            </Link>
        </div>
    );
};
