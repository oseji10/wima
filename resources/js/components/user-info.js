import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
export function UserInfo({ user, showEmail = false }) {
    const getInitials = useInitials();
    return (_jsxs(_Fragment, { children: [_jsx(Avatar, { className: "h-8 w-8 overflow-hidden rounded-full", children: _jsx(AvatarFallback, { className: "rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white" }) }), _jsx("div", { className: "grid flex-1 text-left text-sm leading-tight", children: showEmail && _jsx("span", { className: "text-muted-foreground truncate text-xs", children: user.email }) })] }));
}
