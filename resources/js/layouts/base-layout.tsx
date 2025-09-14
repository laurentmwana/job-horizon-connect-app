import { BaseFooter } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ToastMessage } from '@/components/toast-message';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export const BaseLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col">
            <Navbar />
            <main>{children}</main>
            <ToastMessage />
            <BaseFooter />
        </div>
    );
};
