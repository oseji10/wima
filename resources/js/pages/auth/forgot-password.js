import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };
    return (_jsxs(AuthLayout, { title: "Forgot password", description: "Enter your email to receive a password reset link", children: [_jsx(Head, { title: "Forgot password" }), status && _jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: status }), _jsxs("div", { className: "space-y-6", children: [_jsxs("form", { onSubmit: submit, children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email address" }), _jsx(Input, { id: "email", type: "email", name: "email", autoComplete: "off", value: data.email, autoFocus: true, onChange: (e) => setData('email', e.target.value), placeholder: "email@example.com" }), _jsx(InputError, { message: errors.email })] }), _jsx("div", { className: "my-6 flex items-center justify-start", children: _jsxs(Button, { className: "w-full", disabled: processing, children: [processing && _jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Email password reset link"] }) })] }), _jsxs("div", { className: "text-muted-foreground space-x-1 text-center text-sm", children: [_jsx("span", { children: "Or, return to" }), _jsx(TextLink, { href: route('login'), children: "log in" })] })] })] }));
}
