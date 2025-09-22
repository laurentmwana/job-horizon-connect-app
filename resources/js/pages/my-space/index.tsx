import { Heading } from '@/components/heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BaseLayout } from '@/layouts/base-layout';
import { SpaceFilters } from '@/shared/my-space/space-filters';
import { SpacePiechart } from '@/shared/my-space/space-piechart';
import { StatsDetailsCandidacies, StatsDetailsParticipants } from '@/shared/my-space/space-stats-details';
import { SharedData } from '@/types';
import { FilterYearMonth, SpacePiechartStats } from '@/types/filter';
import { Candidacy, Participant } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

type Props = {
    filters: FilterYearMonth;
    stats: {
        participants: SpacePiechartStats;
        candidacies: SpacePiechartStats;
    };
    candidacies: PaginationData<Candidacy>;
    participants: PaginationData<Participant>;
};

const title = 'Mon espace';

const Page: React.FC<Props> = ({ filters, stats, candidacies, participants }) => {
    const { baseUrl } = usePage<SharedData>().props;

    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container flex flex-col py-12">
                <Heading title={title}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ex cumque temporibus blanditiis eaque, enim laudantium iure dolorem
                    hic culpa adipisci eligendi dolorum molestias? Assumenda suscipit dicta quibusdam ratione temporibus!
                </Heading>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                        <SpaceFilters filters={filters} url={baseUrl} />
                    </div>
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="participated">
                            <TabsList>
                                <TabsTrigger value="participated">Participations</TabsTrigger>
                                <TabsTrigger value="candidacies">Candidatures</TabsTrigger>
                            </TabsList>
                            <TabsContent value="participated">
                                <div className="space-y-4">
                                    <SpacePiechart title="Participants" stats={stats.participants} />
                                    <StatsDetailsParticipants participants={participants} />
                                </div>
                            </TabsContent>
                            <TabsContent value="candidacies">
                                <div className="space-y-4">
                                    <SpacePiechart title="Candidatures" stats={stats.candidacies} />
                                    <StatsDetailsCandidacies candidacies={candidacies} />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};
export default Page;
