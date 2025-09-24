import { HeadingLarge } from '@/components/heading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Faq } from '@/types/model';
import React from 'react';

type Props = {
    faqs: Faq[];
};

export const WelcomeFaqs: React.FC<Props> = ({ faqs }) => {
    if (faqs.length === 0) {
        return null;
    }

    return (
        <div className="container py-10 lg:py-12" aria-label="Question fréquemment posées">
            <HeadingLarge title="Question fréquemment posées" className="mb-8 text-center">
                Vous vous demandez comment fonctionne notre plateforme ou comment profiter au mieux de nos services ?
            </HeadingLarge>

            <div>
                <Accordion type="single" collapsible className="w-full space-y-2">
                    {faqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id} className="rounded-lg border px-4 transition-colors hover:bg-muted/50">
                            <AccordionTrigger className="py-4 text-left hover:no-underline">
                                <span className="font-medium">{faq.question}</span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4">
                                <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};
