'use client';

import { ConfirmationPasswordDialog } from '@/components/dialog-confirmation';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { Edit, Ellipsis, Eye, Trash } from 'lucide-react';
import { useState } from 'react';

type ActionDialogProps = {
    routeEdit?: string | null;
    routeDelete?: string | null;
    routeShow?: string | null;
};

export const ActionDialog = ({ routeShow = null, routeDelete = null, routeEdit = null }: ActionDialogProps) => {
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <Ellipsis size="15" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {routeEdit && (
                        <DropdownMenuItem asChild>
                            <Link href={routeEdit} className="flex items-center gap-2">
                                <Edit className="h-5 w-5" />
                                Editer
                            </Link>
                        </DropdownMenuItem>
                    )}

                    {routeShow && (
                        <DropdownMenuItem asChild>
                            <Link href={routeShow} className="flex items-center gap-2">
                                <Eye className="h-5 w-5" />
                                Détails
                            </Link>
                        </DropdownMenuItem>
                    )}

                    {routeDelete && (
                        <DropdownMenuItem onClick={() => setOpenModalDelete(true)}>
                            <Trash className="h-5 w-5" />
                            Supprimer
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {routeDelete && <ConfirmationPasswordDialog setOpen={setOpenModalDelete} open={openModalDelete} url={routeDelete} />}
        </>
    );
};
