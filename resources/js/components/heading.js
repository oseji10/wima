import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Heading({ title, description }) {
    return (_jsxs("div", { className: "mb-8 space-y-0.5", children: [_jsx("h2", { className: "text-xl font-semibold tracking-tight", children: title }), description && _jsx("p", { className: "text-muted-foreground text-sm", children: description })] }));
}
