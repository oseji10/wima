import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };
    return (_jsxs(AuthLayout, { title: "Log in to your account", description: "Enter your email and password below to log in", children: [_jsx(Head, { title: "Log in" }), _jsxs("form", { className: "flex flex-col gap-6", onSubmit: submit, children: [_jsxs("div", { className: "grid gap-6", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email address" }), _jsx(Input, { id: "email", type: "email", required: true, autoFocus: true, tabIndex: 1, autoComplete: "email", value: data.email, onChange: (e) => setData('email', e.target.value), placeholder: "email@example.com" }), _jsx(InputError, { message: errors.email })] }), _jsxs("div", { className: "grid gap-2", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), canResetPassword && (_jsx(TextLink, { href: route('password.request'), className: "ml-auto text-sm", tabIndex: 5, children: "Forgot password?" }))] }), _jsx(Input, { id: "password", type: "password", required: true, tabIndex: 2, autoComplete: "current-password", value: data.password, onChange: (e) => setData('password', e.target.value), placeholder: "Password" }), _jsx(InputError, { message: errors.password })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Checkbox, { id: "remember", name: "remember", checked: data.remember, onClick: () => setData('remember', !data.remember), tabIndex: 3 }), _jsx(Label, { htmlFor: "remember", children: "Remember me" })] }), _jsxs(Button, { type: "submit", className: "mt-4 w-full", tabIndex: 4, disabled: processing, children: [processing && _jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Log in"] })] }), _jsxs("div", { className: "text-muted-foreground text-center text-sm", children: ["Don't have an account?", ' ', _jsx(TextLink, { href: route('register'), tabIndex: 5, children: "Sign up" })] })] }), status && _jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: status })] }));
}
