import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});
    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };
    return (_jsxs(AuthLayout, { title: "Verify email", description: "Please verify your email address by clicking on the link we just emailed to you.", children: [_jsx(Head, { title: "Email verification" }), status === 'verification-link-sent' && (_jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." })), _jsxs("form", { onSubmit: submit, className: "space-y-6 text-center", children: [_jsxs(Button, { disabled: processing, variant: "secondary", children: [processing && _jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Resend verification email"] }), _jsx(TextLink, { href: route('logout'), method: "post", className: "mx-auto block text-sm", children: "Log out" })] })] }));
}
