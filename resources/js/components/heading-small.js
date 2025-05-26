import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function HeadingSmall({ title, description }) {
    return (_jsxs("header", { children: [_jsx("h3", { className: "mb-0.5 text-base font-medium", children: title }), description && _jsx("p", { className: "text-muted-foreground text-sm", children: description })] }));
}
