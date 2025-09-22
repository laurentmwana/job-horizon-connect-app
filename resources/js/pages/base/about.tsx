import { Heading } from '@/components/heading';
import { BaseLayout } from '@/layouts/base-layout';
import { Head } from '@inertiajs/react';

const Page = () => {
    return (
        <BaseLayout>
            <Head title="À propos" />

            <div className="container mx-auto space-y-8 px-4 py-12">
                <Heading title="À propos de Job Horizon Connect" />

                <div className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    <p>
                        <strong>Job Horizon Connect</strong> est l’application officielle développée par <strong>Job Horizon</strong>, une entreprise
                        engagée dans la valorisation des talents et l’accompagnement professionnel. Cette plateforme numérique a été pensée pour
                        faciliter les échanges entre l’entreprise et les candidats, en leur offrant un espace moderne, intuitif et sécurisé pour
                        postuler à des offres d’emploi ou participer à des activités organisées.
                    </p>

                    <p>Notre mission est de créer un environnement numérique où chaque candidat peut :</p>

                    <ul className="ml-4 list-inside list-disc space-y-2">
                        <li>Consulter les offres d’emploi disponibles en temps réel.</li>
                        <li>Postuler directement via une interface intuitive et sécurisée.</li>
                        <li>Participer à des ateliers, séminaires, formations ou événements organisés par Job Horizon.</li>
                        <li>Suivre l’évolution de sa candidature et recevoir des notifications personnalisées.</li>
                    </ul>

                    <p>
                        Que vous soyez jeune diplômé, professionnel expérimenté ou en reconversion, Job Horizon Connect vous accompagne à chaque étape
                        de votre démarche. Chaque fonctionnalité a été pensée pour répondre aux besoins concrets des candidats et refléter les valeurs
                        de Job Horizon.
                    </p>

                    <p>
                        <strong>Nos engagements :</strong>
                    </p>

                    <ul className="ml-4 list-inside list-disc space-y-2">
                        <li>
                            <strong>Proximité</strong> : Nous plaçons l’humain au cœur de notre démarche.
                        </li>
                        <li>
                            <strong>Clarté</strong> : Des processus simplifiés et une communication transparente.
                        </li>
                        <li>
                            <strong>Innovation</strong> : Une technologie évolutive au service du recrutement.
                        </li>
                        <li>
                            <strong>Inclusion</strong> : Une plateforme ouverte à tous, sans discrimination.
                        </li>
                    </ul>

                    <p>
                        En lançant Job Horizon Connect, l’entreprise affirme sa volonté de moderniser ses processus de recrutement et d’impliquer
                        activement les candidats dans la vie de l’organisation. C’est une invitation à découvrir notre univers, nos valeurs, et à
                        construire ensemble un avenir professionnel solide et enrichissant.
                    </p>
                </div>
            </div>
        </BaseLayout>
    );
};

export default Page;
