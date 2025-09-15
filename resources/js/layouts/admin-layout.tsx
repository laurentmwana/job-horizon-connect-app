import { AppLogo } from '@/components/app-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { ToastMessage } from '@/components/toast-message';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
import { ArrowUp01, Calendar, Home, Inbox, Option, User, Users } from 'lucide-react';
import { PropsWithChildren } from 'react';

// Menu items.
const items = [
    {
        title: 'Application',
        childrens: [
            {
                title: 'Tableau de bord',
                url: '/dashboard',
                icon: Home,
            },
        ],
    },

    {
        title: 'Gestions',
        childrens: [
            {
                title: 'Offres',
                url: '/admin/offer',
                icon: Inbox,
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
                icon: ArrowUp01,
                group: '/admin/job-position',
            },

            {
                title: 'Candidat',
                url: '/admin/candidate',
                icon: User,
                group: '/admin/candidate',
            },
            {
                title: 'Candidature',
                url: '/admin/candidacy',
                icon: Option,
                group: '/admin/candidacy',
            },
            {
                title: 'Utilisateur',
                url: '/admin/user',
                icon: Users,
                group: '/admin/user',
            },
        ],
    },
];

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
                                    {group.childrens.map((c) => (
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
                            <button className="flex flex-col rounded-xl border p-2">
                                <div className="flex items-center justify-start gap-2">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col gap-1 text-sm">
                                        <h2 className="font-medium">{excerpt(auth.user.name, 15)}</h2>
                                        <p className="text-muted-foreground">{excerpt(auth.user.email)}</p>
                                    </div>
                                </div>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Mon profil</DropdownMenuItem>
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
