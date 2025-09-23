import { Clock, Home, Mail, Phone } from 'lucide-react';

export const ContactInfo = () => {
    const contactItems = [
        {
            icon: Mail,
            label: 'Adresse e-mail',
            value: 'contact@job-horizon.com',
            href: 'mailto:contact@job-horizon.com',
            type: 'link' as const,
        },
        {
            icon: Phone,
            label: 'Téléphone',
            value: '+243 818 043 802',
            href: 'tel:+243818043802',
            type: 'link' as const,
        },
        {
            icon: Home,
            label: 'Adresse',
            value: '374 Colonel mondjiba, galerie st Pierre, local 18. Référence : alimentation S & K, Kinshasa, RDC',
            type: 'text' as const,
        },
        {
            icon: Clock,
            label: 'Horaires',
            value: 'Lundi à Vendredi, 8h30 - 17h (UTC+1)',
            type: 'text' as const,
        },
    ];

    return (
        <div className="rounded-xl border p-6 shadow-sm">
            <div className="space-y-4">
                {contactItems.map((item, index) => {
                    const IconComponent = item.icon;

                    return (
                        <div key={index} className="group flex items-start gap-3">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border shadow-sm transition-colors duration-200 group-hover:border-primary/20 group-hover:bg-primary/5">
                                <IconComponent className="h-4 w-4 transition-colors duration-200 group-hover:text-primary" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="mb-1 text-sm font-medium">{item.label}</div>

                                {item.type === 'link' ? (
                                    <a
                                        href={item.href}
                                        className="text-sm font-medium break-words text-primary transition-colors duration-200 hover:text-primary/80 hover:underline"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <div className="text-sm leading-relaxed break-words text-muted-foreground">{item.value}</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="text-center text-xs text-slate-500">Nous nous efforçons de répondre à toutes les demandes dans les 24 heures</p>
            </div>
        </div>
    );
};
