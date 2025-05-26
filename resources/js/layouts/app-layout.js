import { jsx as _jsx } from "react/jsx-runtime";
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
export default ({ children, breadcrumbs, ...props }) => (_jsx(AppLayoutTemplate, { breadcrumbs: breadcrumbs, ...props, children: children }));
