import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
    return (_jsxs(AuthLayout, { title: "Create an account", description: "Enter your details below to create your account", children: [_jsx(Head, { title: "Register" }), _jsxs("form", { className: "flex flex-col gap-6", onSubmit: submit, children: [_jsxs("div", { className: "grid gap-6", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "name", children: "Name" }), _jsx(Input, { id: "name", type: "text", required: true, autoFocus: true, tabIndex: 1, autoComplete: "name", value: data.name, onChange: (e) => setData('name', e.target.value), disabled: processing, placeholder: "Full name" }), _jsx(InputError, { message: errors.name, className: "mt-2" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email address" }), _jsx(Input, { id: "email", type: "email", required: true, tabIndex: 2, autoComplete: "email", value: data.email, onChange: (e) => setData('email', e.target.value), disabled: processing, placeholder: "email@example.com" }), _jsx(InputError, { message: errors.email })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", required: true, tabIndex: 3, autoComplete: "new-password", value: data.password, onChange: (e) => setData('password', e.target.value), disabled: processing, placeholder: "Password" }), _jsx(InputError, { message: errors.password })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password_confirmation", children: "Confirm password" }), _jsx(Input, { id: "password_confirmation", type: "password", required: true, tabIndex: 4, autoComplete: "new-password", value: data.password_confirmation, onChange: (e) => setData('password_confirmation', e.target.value), disabled: processing, placeholder: "Confirm password" }), _jsx(InputError, { message: errors.password_confirmation })] }), _jsxs(Button, { type: "submit", className: "mt-2 w-full", tabIndex: 5, disabled: processing, children: [processing && _jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Create account"] })] }), _jsxs("div", { className: "text-muted-foreground text-center text-sm", children: ["Already have an account?", ' ', _jsx(TextLink, { href: route('login'), tabIndex: 6, children: "Log in" })] })] })] }));
}
