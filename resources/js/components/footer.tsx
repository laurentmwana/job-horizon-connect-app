import { Link } from '@inertiajs/react';
import { Heart, Mail, Minus, Shield } from 'lucide-react';
import React from 'react';
import { Separator } from './ui/separator';

export const BaseFooter: React.FC = () => {
    return (
        <footer className="mt-auto border-t bg-muted/30 text-foreground">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* À propos */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">À propos</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Job Horizon Connect est une plateforme qui met en relation candidats et recruteurs, en offrant des conseils pratiques, des
                            opportunités d’emploi et une communauté active.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/offers"
                                    className="flex items-center space-x-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Minus className="h-3 w-3" />
                                    <span>Offres</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="flex items-center space-x-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Minus className="h-3 w-3" />
                                    <span>A propos</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/activities"
                                    className="flex items-center space-x-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Minus className="h-3 w-3" />
                                    <span>Activités</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/contact"
                                    className="flex items-center space-x-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Mail className="h-3 w-3" />
                                    <span>Contactez-nous</span>
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="mailto:contact@jobhorizonconnect.com"
                                    className="flex items-center space-x-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Shield className="h-3 w-3" />
                                    <span>Centre d’aide</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Réseaux sociaux</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://api.whatsapp.com/send/?phone=243822717635&text&type=phone_number&app_absent=0"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg bg-muted p-2 transition-colors hover:bg-muted/80"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="bi bi-whatsapp h-5 w-5 text-green-500"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                </svg>
                            </a>
                            <a href="mailto:contact@jobhorizonconnect.com" className="rounded-lg bg-muted p-2 transition-colors hover:bg-muted/80">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Suivez Job Horizon Connect pour rester informé des dernières opportunités et conseils.
                        </p>
                    </div>
                </div>

                <Separator className="my-8" />

                {/* Section Copyright */}
                <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                    <div className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Job Horizon Connect. Tous droits réservés | Développé avec{' '}
                        <Heart className="inline h-3 w-3 text-red-500" /> par{' '}
                        <a
                            target="_blank"
                            href="https://github.com/laurentmwana"
                            className="underline transition-colors hover:text-foreground"
                            rel="noreferrer"
                        >
                            Labeya
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
