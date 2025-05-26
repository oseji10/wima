import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
const breadcrumbs = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];
export default function Profile({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });
    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };
    return (_jsxs(AppLayout, { breadcrumbs: breadcrumbs, children: [_jsx(Head, { title: "Profile settings" }), _jsxs(SettingsLayout, { children: [_jsxs("div", { className: "space-y-6", children: [_jsx(HeadingSmall, { title: "Profile information", description: "Update your name and email address" }), _jsxs("form", { onSubmit: submit, className: "space-y-6", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "name", children: "Name" }), _jsx(Input, { id: "name", className: "mt-1 block w-full", value: data.name, onChange: (e) => setData('name', e.target.value), required: true, autoComplete: "name", placeholder: "Full name" }), _jsx(InputError, { className: "mt-2", message: errors.name })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email address" }), _jsx(Input, { id: "email", type: "email", className: "mt-1 block w-full", value: data.email, onChange: (e) => setData('email', e.target.value), required: true, autoComplete: "username", placeholder: "Email address" }), _jsx(InputError, { className: "mt-2", message: errors.email })] }), mustVerifyEmail && auth.user.email_verified_at === null && (_jsxs("div", { children: [_jsxs("p", { className: "text-muted-foreground -mt-4 text-sm", children: ["Your email address is unverified.", ' ', _jsx(Link, { href: route('verification.send'), method: "post", as: "button", className: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500", children: "Click here to resend the verification email." })] }), status === 'verification-link-sent' && (_jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "A new verification link has been sent to your email address." }))] })), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { disabled: processing, children: "Save" }), _jsx(Transition, { show: recentlySuccessful, enter: "transition ease-in-out", enterFrom: "opacity-0", leave: "transition ease-in-out", leaveTo: "opacity-0", children: _jsx("p", { className: "text-sm text-neutral-600", children: "Saved" }) })] })] })] }), _jsx(DeleteUser, {})] })] }));
}
