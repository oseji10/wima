import { jsx as _jsx } from "react/jsx-runtime";
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
export default function AuthLayout({ children, title, description, ...props }) {
    return (_jsx(AuthLayoutTemplate, { title: title, description: description, ...props, children: children }));
}
