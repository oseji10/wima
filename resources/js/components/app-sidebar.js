import { jsx as _jsx } from "react/jsx-runtime";
import { Sidebar } from '@/components/ui/sidebar';
import { NetworkIcon, Users2 } from 'lucide-react';
const mainNavItems = [
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
const footerNavItems = [
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
    return (_jsx(Sidebar, { collapsible: "icon", variant: "inset" }));
}
