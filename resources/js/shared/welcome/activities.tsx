import { HeadingLarge } from '@/components/heading';
import { Activity } from '@/types/model';
import React from 'react';
import { ActivityCollection } from '../activity/activity-card';

type Props = {
    activities: Activity[];
};

export const WelcomeActivities: React.FC<Props> = ({ activities }) => {
    if (!activities.length) {
        return null;
    }

    return (
        <div className="container py-10 lg:py-12" aria-label="Section des dernières activités">
            <HeadingLarge title="Dernières activités" className="mb-8 text-center">
                Découvrez en un clin d’œil les dernières opportunités partagées par nos recruteurs et donnez
                <br />
                un nouvel élan à votre parcours professionnel.
            </HeadingLarge>

            <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
                {activities.map((activity) => (
                    <div key={activity.id} className="h-full">
                        <ActivityCollection activity={activity} />
                    </div>
                ))}
            </div>
        </div>
    );
};
