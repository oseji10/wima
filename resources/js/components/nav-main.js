import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
export function NavMain({ items = [] }) {
    const page = usePage();
    return (_jsxs(SidebarGroup, { className: "px-2 py-0", children: [_jsx(SidebarGroupLabel, { children: "Platform" }), _jsx(SidebarMenu, { children: items.map((item) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, isActive: item.href === page.url, tooltip: { children: item.title }, children: _jsxs(Link, { href: item.href, prefetch: true, children: [item.icon && _jsx(item.icon, {}), _jsx("span", { children: item.title })] }) }) }, item.title))) })] }));
}
