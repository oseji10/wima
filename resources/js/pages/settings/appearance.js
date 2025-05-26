import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
const breadcrumbs = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];
export default function Appearance() {
    return (_jsxs(AppLayout, { breadcrumbs: breadcrumbs, children: [_jsx(Head, { title: "Appearance settings" }), _jsx(SettingsLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsx(HeadingSmall, { title: "Appearance settings", description: "Update your account's appearance settings" }), _jsx(AppearanceTabs, {})] }) })] }));
}
