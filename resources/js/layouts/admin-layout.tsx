import { AppLogo } from '@/components/app-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { ToastMessage } from '@/components/toast-message';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { excerpt, getInitials, isMenuActive } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Award, Briefcase, Calendar, FileText, User, Users } from 'lucide-react';

import { PropsWithChildren } from 'react';

// Menu items.

import { FileStack, LayoutDashboard, Package, Shield } from 'lucide-react';

const items = [
    {
        title: 'Application',
        children: [
            {
                title: 'Tableau de bord',
                url: '/dashboard',
                icon: LayoutDashboard,
            },
        ],
    },

    {
        title: 'Gestion',
        children: [
            {
                title: 'Offres',
                url: '/admin/offer',
                icon: Package,
                group: '/admin/offer',
            },
            {
                title: 'Activités',
                url: '/admin/activity',
                icon: Calendar,
                group: '/admin/activity',
            },
            {
                title: 'Postes',
                url: '/admin/job-position',
                icon: Briefcase,
                group: '/admin/job-position',
            },
            {
                title: 'Compétences',
                url: '/admin/skill',
                icon: Award,
                group: '/admin/skill',
            },
            {
                title: 'Candidats',
                url: '/admin/candidate',
                icon: User,
                group: '/admin/candidate',
            },
            {
                title: 'Candidatures',
                url: '/admin/candidacy',
                icon: FileText,
                group: '/admin/candidacy',
            },
            {
                title: 'Participants',
                url: '/admin/participant',
                icon: Users,
                group: '/admin/participant',
            },
            {
                title: 'Utilisateurs',
                url: '/admin/user',
                icon: Shield,
                group: '/admin/user',
            },
        ],
    },

    {
        title: 'Documents générés',
        children: [
            {
                title: 'Candidatures PDF',
                url: '/admin/generate/candidacies',
                icon: FileStack,
            },
            {
                title: 'Participants PDF',
                url: '/admin/generate/participants',
                icon: FileStack,
                group: '/admin/generate/participants',
            },
        ],
    },
];

export default items;

export const AdminLayout = ({ children }: PropsWithChildren) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon" variant="inset">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <Link href="/dashboard" prefetch>
                                    <AppLogo />
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    {items.map((group) => {
                        return (
                            <SidebarGroup className="px-2 py-0" key={group.title}>
                                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                                <SidebarMenu>
                                    {group.children.map((c) => (
                                        <SidebarMenuItem key={c.title}>
                                            <SidebarMenuButton isActive={isMenuActive(c.url)} tooltip={{ children: c.title }} asChild>
                                                <Link href={c.url} prefetch>
                                                    {c.icon && <c.icon />}
                                                    <span>{c.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroup>
                        );
                    })}
                </SidebarContent>

                <SidebarFooter>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex flex-col rounded-xl border p-2 transition hover:bg-accent">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col gap-0.5 text-left text-sm">
                                        <h2 className="font-medium">{excerpt(auth.user.name, 15)}</h2>
                                        <p className="text-muted-foreground">{excerpt(auth.user.email, 20)}</p>
                                    </div>
                                </div>
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem asChild>
                                <Link href="/profile">Mon profil</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/">Accueil</Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={() => router.post('/logout')}>Se déconnecter</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sm:px-6">
                    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                        {/* Sidebar Trigger */}
                        <SidebarTrigger className="-ml-1 flex-shrink-0" />

                        {/* Barre verticale */}
                        <Separator orientation="vertical" className="h-full w-2" />
                    </div>
                    <ThemeToggle />
                </header>
                <main className="container-sidebar">{children}</main>
            </SidebarInset>

            <ToastMessage />
        </SidebarProvider>
    );
};
