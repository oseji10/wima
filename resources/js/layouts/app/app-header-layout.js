import { jsx as _jsx } from "react/jsx-runtime";
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
export default function AppHeaderLayout({ children, breadcrumbs }) {
    return (_jsx(AppShell, { children: _jsx(AppContent, { children: children }) }));
}
