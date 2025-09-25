'use client';

import { Button } from '@/components/ui/button';
import { Download, FileText, X } from 'lucide-react';
import type React from 'react';
import { useEffect } from 'react';

type Props = {
    pdfUrl: string;
    name: string;
    open: boolean;
    setOpen: (v: boolean) => void;
};

export const PDFViewerDialog: React.FC<Props> = ({ pdfUrl, name, open, setOpen }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `CV_${name.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [open, setOpen]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
            {/* Header avec titre et boutons */}
            <div className="flex flex-shrink-0 items-center justify-between border-b bg-muted/30 px-6 py-4">
                <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-lg font-medium">CV - {name}</h2>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleDownload}
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                        <Download className="h-4 w-4" />
                        Télécharger
                    </Button>

                    <Button
                        onClick={() => setOpen(false)}
                        variant="outline"
                        size="sm"
                        className="hover:text-destructive-foreground gap-2 bg-transparent transition-colors hover:bg-destructive"
                    >
                        <X className="h-4 w-4" />
                        Fermer
                    </Button>
                </div>
            </div>

            {/* Conteneur PDF plein écran */}
            <div className="flex-1 overflow-hidden">
                <iframe
                    src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH&zoom=page-width`}
                    className="h-full w-full border-0"
                    title={`CV de ${name}`}
                />
            </div>
        </div>
    );
};
