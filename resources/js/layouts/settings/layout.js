import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
const sidebarNavItems = [
    {
        title: 'Profile',
        href: '/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        href: '/settings/password',
        icon: null,
    },
    {
        title: 'Appearance',
        href: '/settings/appearance',
        icon: null,
    },
];
export default function SettingsLayout({ children }) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }
    const currentPath = window.location.pathname;
    return (_jsxs("div", { className: "px-4 py-6", children: [_jsx(Heading, { title: "Settings", description: "Manage your profile and account settings" }), _jsxs("div", { className: "flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12", children: [_jsx("aside", { className: "w-full max-w-xl lg:w-48", children: _jsx("nav", { className: "flex flex-col space-y-1 space-x-0", children: sidebarNavItems.map((item) => (_jsx(Button, { size: "sm", variant: "ghost", asChild: true, className: cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.href,
                                }), children: _jsx(Link, { href: item.href, prefetch: true, children: item.title }) }, item.href))) }) }), _jsx(Separator, { className: "my-6 md:hidden" }), _jsx("div", { className: "flex-1 md:max-w-2xl", children: _jsx("section", { className: "max-w-xl space-y-12", children: children }) })] })] }));
}
