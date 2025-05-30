import { jsx as _jsx } from "react/jsx-runtime";
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';
export function AppShell({ children, variant = 'header' }) {
    const [isOpen, setIsOpen] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('sidebar') !== 'false' : true));
    const handleSidebarChange = (open) => {
        setIsOpen(open);
        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebar', String(open));
        }
    };
    if (variant === 'header') {
        return _jsx("div", { className: "flex min-h-screen w-full flex-col", children: children });
    }
    return (_jsx(SidebarProvider, { defaultOpen: isOpen, open: isOpen, onOpenChange: handleSidebarChange, children: children }));
}
