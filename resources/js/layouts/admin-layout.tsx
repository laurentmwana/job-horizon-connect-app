import { Calendar, Home, Inbox, Unlink, Users } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from '@/components/ui/sidebar';
import { isMenuActive } from '@/lib/utils';
import { PropsWithChildren } from 'react';

// Menu items.
const items = [
    {
        title: 'Tableau de bord',
        url: '/dashboard',
        icon: Home,
    },
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
        title: 'Faq',
        url: '/admin/quiz',
        icon: Unlink,
        group: '/admin/faq',
    },
    {
        title: 'Utilisateur',
        url: '/admin/user',
        icon: Users,
        group: '/admin/user',
    },
];

export const AdminLayout = ({ children }: PropsWithChildren) => {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Job Horizon Connect</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem className={`${isMenuActive(item.url, item.group) ? 'text-primary' : ''}`} key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
};
