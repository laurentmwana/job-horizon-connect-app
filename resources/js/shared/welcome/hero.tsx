'use client';

import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import type React from 'react';

export const WelcomeHero: React.FC = ({}) => {
    return (
        <div className="relative isolate min-h-screen px-6 pt-8 lg:px-8">
            {/* Gradient Background Top */}
            <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:from-blue-600 dark:via-purple-700 dark:to-pink-700 dark:opacity-15"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto max-w-3xl py-32">
                {/* Badge */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="hidden sm:mb-8 sm:flex sm:justify-center"
                >
                    <div className="relative rounded-full bg-white/50 px-3 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 backdrop-blur-sm hover:ring-gray-900/20 dark:bg-gray-800/50 dark:text-gray-300 dark:ring-gray-100/10 dark:hover:ring-gray-100/20">
                        <Link href="/about" className="ml-1">
                            Facilitez votre avenir professionnel.
                        </Link>
                    </div>
                </motion.div>

                <div className="text-center">
                    {/* Animated Title */}
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                        className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white"
                    >
                        <span>Job </span>
                        <span className="text-primary">Horizon </span>
                        <span>Connect</span>
                        <span className="text-primary">.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 text-lg font-normal text-pretty text-gray-500 sm:text-xl dark:text-gray-400"
                    >
                        Notre plateforme vous connecte aux opportunités d’emploi et aux activités de recrutement proposées par l’entreprise. Postulez,
                        participez, évoluez.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-10 flex items-center justify-center gap-x-6"
                    >
                        <Link
                            href="/offers"
                            className="inline-block rounded-xl bg-primary px-4 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 dark:text-white/90 dark:hover:bg-primary/80"
                        >
                            Postuler
                        </Link>
                        <Link
                            href="/about"
                            className="inline-block rounded-xl border border-primary px-4 py-3 text-base font-medium text-primary transition-colors hover:bg-primary/10 dark:hover:bg-primary/20"
                        >
                            En savoir plus <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Gradient Background Bottom */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] dark:from-blue-600 dark:via-purple-700 dark:to-pink-700 dark:opacity-15"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
        </div>
    );
};
