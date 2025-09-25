import { ActionDialog } from '@/components/action-dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { User } from '@/types';
import { Lock } from 'lucide-react';
import React, { useState } from 'react';
import { UserFormChangePassword } from './user-form';

type Props = {
    users: User[];
};

export const UsersTable: React.FC<Props> = ({ users }) => {
    const [userId, setUserId] = useState<string | null>(null);
    return (
        <Table aria-label="Liste des utilisateurs">
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Adresse e-mail vérifiée</TableHead>
                    <TableHead>Candidat(e) </TableHead>
                    <TableHead>Créé le</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <React.Fragment key={user.id}>
                        <TableRow>
                            <TableCell>{excerpt(user.name, 40)}</TableCell>
                            <TableCell>{excerpt(user.email, 40)}</TableCell>
                            <TableCell>
                                <Badge variant={user.email_verified_at ? 'outline' : 'destructive'}>{user.email_verified_at ? 'Oui' : 'Non'}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={user.candidate ? 'outline' : 'destructive'}>{user.candidate ? 'Oui' : 'Non'}</Badge>
                            </TableCell>
                            <TableCell>Il y a {ago(user.created_at)}</TableCell>
                            <TableCell className="text-end">
                                <ActionDialog
                                    routeShow={`/admin/user/${user.id}`}
                                    routeEdit={`/admin/user/${user.id}/edit`}
                                    routeDelete={`/admin/user/${user.id}`}
                                    routeOther={{
                                        content: 'Changer le mot de passe',
                                        icon: <Lock className="h-5 w-5" />,
                                        onClick: () => setUserId(user.id),
                                    }}
                                />
                            </TableCell>
                        </TableRow>

                        <UserFormChangePassword user={user} open={user.id === userId} setOpen={(v) => setUserId(null)} />
                    </React.Fragment>
                ))}
            </TableBody>
        </Table>
    );
};
