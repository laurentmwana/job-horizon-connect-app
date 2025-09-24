'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Faq } from '@/types/model';
import { CalendarIcon } from 'lucide-react';
import type React from 'react';

type FaqsProps = { faq: Faq };

export const FaqDetails: React.FC<FaqsProps> = ({ faq }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl">{faq.question}</CardTitle>
                <CardDescription className="mt-1">{faq.answer}</CardDescription>
            </CardHeader>

            <CardContent className="p-6">
                <div className="space-y-6">
                    <div className="grid gap-4">
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                            <CalendarIcon size={18} className="text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Date de création</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(faq.created_at).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
