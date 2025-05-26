import { jsx as _jsx } from "react/jsx-runtime";
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
export default function AppSidebarLayout({ children, breadcrumbs = [] }) {
    return (_jsx(AppShell, { variant: "sidebar", children: _jsx(AppContent, { variant: "sidebar", children: children }) }));
}
