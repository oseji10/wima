import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { Monitor, Moon, Sun } from 'lucide-react';
export default function AppearanceToggleDropdown({ className = '', ...props }) {
    const { appearance, updateAppearance } = useAppearance();
    const getCurrentIcon = () => {
        switch (appearance) {
            case 'dark':
                return _jsx(Moon, { className: "h-5 w-5" });
            case 'light':
                return _jsx(Sun, { className: "h-5 w-5" });
            default:
                return _jsx(Monitor, { className: "h-5 w-5" });
        }
    };
    return (_jsx("div", { className: className, ...props, children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "icon", className: "h-9 w-9 rounded-md", children: [getCurrentIcon(), _jsx("span", { className: "sr-only", children: "Toggle theme" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { onClick: () => updateAppearance('light'), children: _jsxs("span", { className: "flex items-center gap-2", children: [_jsx(Sun, { className: "h-5 w-5" }), "Light"] }) }), _jsx(DropdownMenuItem, { onClick: () => updateAppearance('dark'), children: _jsxs("span", { className: "flex items-center gap-2", children: [_jsx(Moon, { className: "h-5 w-5" }), "Dark"] }) }), _jsx(DropdownMenuItem, { onClick: () => updateAppearance('system'), children: _jsxs("span", { className: "flex items-center gap-2", children: [_jsx(Monitor, { className: "h-5 w-5" }), "System"] }) })] })] }) }));
}
