import { ActionDialog } from '@/components/action-dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ago } from '@/lib/date-time';
import { excerpt } from '@/lib/utils';
import { Skill } from '@/types/model';
import { Link } from '@inertiajs/react';
import React from 'react';

type Props = {
    skills: Skill[];
};

export const SkillsTable: React.FC<Props> = ({ skills }) => {
    return (
        <Table aria-label="Liste des compétences">
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Poste</TableHead>
                    <TableHead>Créé</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {skills.map((skill) => (
                    <TableRow key={skill.id}>
                        <TableCell>{excerpt(skill.name, 40)}</TableCell>
                        <TableCell>
                            <Link
                                className="hover:text-primary hover:underline"
                                href={`/admin/job-position/${skill.job_position.id}`}
                            >
                                {excerpt(skill.job_position.name, 30)}
                            </Link>
                        </TableCell>
                        <TableCell>Il y a {ago(skill.created_at)}</TableCell>
                        <TableCell className="text-end">
                            <ActionDialog
                                routeShow={`/admin/skill/${skill.id}`}
                                routeEdit={`/admin/skill/${skill.id}/edit`}
                                routeDelete={`/admin/skill/${skill.id}`}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
