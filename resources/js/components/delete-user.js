import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import HeadingSmall from '@/components/heading-small';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
export default function DeleteUser() {
    const passwordInput = useRef(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });
    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };
    const closeModal = () => {
        clearErrors();
        reset();
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(HeadingSmall, { title: "Delete account", description: "Delete your account and all of its resources" }), _jsxs("div", { className: "space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10", children: [_jsxs("div", { className: "relative space-y-0.5 text-red-600 dark:text-red-100", children: [_jsx("p", { className: "font-medium", children: "Warning" }), _jsx("p", { className: "text-sm", children: "Please proceed with caution, this cannot be undone." })] }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "destructive", children: "Delete account" }) }), _jsxs(DialogContent, { children: [_jsx(DialogTitle, { children: "Are you sure you want to delete your account?" }), _jsx(DialogDescription, { children: "Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }), _jsxs("form", { className: "space-y-6", onSubmit: deleteUser, children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password", className: "sr-only", children: "Password" }), _jsx(Input, { id: "password", type: "password", name: "password", ref: passwordInput, value: data.password, onChange: (e) => setData('password', e.target.value), placeholder: "Password", autoComplete: "current-password" }), _jsx(InputError, { message: errors.password })] }), _jsxs(DialogFooter, { className: "gap-2", children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "secondary", onClick: closeModal, children: "Cancel" }) }), _jsx(Button, { variant: "destructive", disabled: processing, asChild: true, children: _jsx("button", { type: "submit", children: "Delete account" }) })] })] })] })] })] })] }));
}
