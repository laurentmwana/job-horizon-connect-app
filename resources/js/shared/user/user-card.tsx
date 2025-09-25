'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/types';
import type React from 'react';

type UserDetailsProps = { user: User };

export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">{user.name}</CardTitle>
                <CardDescription className="mt-1 text-muted-foreground">{user.email}</CardDescription>
            </CardHeader>
        </Card>
    );
};
