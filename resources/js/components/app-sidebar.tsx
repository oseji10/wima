import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowDownNarrowWide, ArrowLeftRightIcon, BookOpen, ChartCandlestick, Folder, Hospital, LayoutGrid, NetworkIcon, TicketsPlane, TreePalm, Users2, Wallet2, WavesLadder } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    // {
    //     title: 'Dashboard',
    //     href: '/dashboard',
    //     icon: LayoutGrid,
    // },
    {
        title: 'Hubs',
        href: '/hubs',
        icon: NetworkIcon,
    },
    {
        title: 'Members',
        href: '/members',
        icon: Users2,
    },
    // {
    //     title: 'Staff',
    //     href: '/staff',
    //     icon: Users2,
    // },
    // {
    //     title: 'Cadre',
    //     href: '/cadres',
    //     icon: ArrowDownNarrowWide,
    // },

    // {
    //     title: 'PFAs',
    //     href: '/pfas',
    //     icon: Wallet2,
    // },

    // {
    //     title: 'HIP',
    //     href: '/hip',
    //     icon: Hospital,
    // },

    // {
    //     title: 'Leave',
    //     href: '/leave',
    //     icon: TicketsPlane,
    // },

    // {
    //     title: 'Transfer/Posting',
    //     href: '/transfers',
    //     icon: ArrowLeftRightIcon,
    // },

    // {
    //     title: 'Reports',
    //     href: '/reports',
    //     icon: ChartCandlestick,
    // },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            {/* <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="#" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader> */}

            {/* <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent> */}

            {/* <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter> */}
        </Sidebar>
    );
}
