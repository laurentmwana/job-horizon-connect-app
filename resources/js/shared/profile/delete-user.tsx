import { ConfirmationPasswordDialog } from '@/components/dialog-confirmation';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import React, { useState } from 'react';

type Props = { user: User };

export const ProfileUserDeleteAccountForm: React.FC<Props> = ({ user }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="rounded-xl border px-4 py-6">
            <div className="max-w-4xl space-y-6">
                <div className="grid gap-3">
                    <h2 className="text-base font-medium">Suppression de compte</h2>
                    <p className="text-muted-foreground">
                        Vous avez la possibilité de supprimer définitivement votre compte. Cette action est irréversible : toutes vos données
                        personnelles, votre historique et vos informations associées seront effacés de notre système.
                    </p>
                </div>

                <Button onClick={() => setOpen(true)} variant="destructive">
                    Supprimer mon compte
                </Button>

                <ConfirmationPasswordDialog open={open} setOpen={setOpen} url={'/profile/destroy'} />
            </div>
        </div>
    );
};
