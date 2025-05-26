import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };
    return (_jsxs(AuthLayout, { title: "Confirm your password", description: "This is a secure area of the application. Please confirm your password before continuing.", children: [_jsx(Head, { title: "Confirm password" }), _jsx("form", { onSubmit: submit, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", name: "password", placeholder: "Password", autoComplete: "current-password", value: data.password, autoFocus: true, onChange: (e) => setData('password', e.target.value) }), _jsx(InputError, { message: errors.password })] }), _jsx("div", { className: "flex items-center", children: _jsxs(Button, { className: "w-full", disabled: processing, children: [processing && _jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Confirm password"] }) })] }) })] }));
}
