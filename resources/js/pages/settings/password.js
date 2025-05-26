import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const breadcrumbs = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];
export default function Password() {
    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };
    return (_jsxs(AppLayout, { breadcrumbs: breadcrumbs, children: [_jsx(Head, { title: "Profile settings" }), _jsx(SettingsLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsx(HeadingSmall, { title: "Update password", description: "Ensure your account is using a long, random password to stay secure" }), _jsxs("form", { onSubmit: updatePassword, className: "space-y-6", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "current_password", children: "Current password" }), _jsx(Input, { id: "current_password", ref: currentPasswordInput, value: data.current_password, onChange: (e) => setData('current_password', e.target.value), type: "password", className: "mt-1 block w-full", autoComplete: "current-password", placeholder: "Current password" }), _jsx(InputError, { message: errors.current_password })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password", children: "New password" }), _jsx(Input, { id: "password", ref: passwordInput, value: data.password, onChange: (e) => setData('password', e.target.value), type: "password", className: "mt-1 block w-full", autoComplete: "new-password", placeholder: "New password" }), _jsx(InputError, { message: errors.password })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password_confirmation", children: "Confirm password" }), _jsx(Input, { id: "password_confirmation", value: data.password_confirmation, onChange: (e) => setData('password_confirmation', e.target.value), type: "password", className: "mt-1 block w-full", autoComplete: "new-password", placeholder: "Confirm password" }), _jsx(InputError, { message: errors.password_confirmation })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { disabled: processing, children: "Save password" }), _jsx(Transition, { show: recentlySuccessful, enter: "transition ease-in-out", enterFrom: "opacity-0", leave: "transition ease-in-out", leaveTo: "opacity-0", children: _jsx("p", { className: "text-sm text-neutral-600", children: "Saved" }) })] })] })] }) })] }));
}
