import { Heading } from '@/components/heading';
import { BaseLayout } from '@/layouts/base-layout';
import { SpaceFilters } from '@/shared/my-space/space-filters';
import { SpacePiechart } from '@/shared/my-space/space-piechart';
import { SharedData } from '@/types';
import { FilterYearMonth, SpacePiechartStats } from '@/types/filter';
import { Head, usePage } from '@inertiajs/react';

type Props = {
    filters: FilterYearMonth;
    stats: {
        participants: SpacePiechartStats;
        candidacies: SpacePiechartStats;
    };
};

const title = 'Mon espace';

const Page = () => {
    const { baseUrl, filters, stats } = usePage<SharedData & Props>().props;

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
                        <div className="space-y-4">
                            <SpacePiechart title="Candidatures" stats={stats.candidacies} />
                            <SpacePiechart title="Participants" stats={stats.participants} />
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};
export default Page;
