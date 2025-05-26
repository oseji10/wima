import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];
const rightNavItems = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];
const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';
export function AppHeader({ breadcrumbs = [] }) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "border-sidebar-border/80 border-b", children: _jsxs("div", { className: "mx-auto flex h-16 items-center px-4 md:max-w-7xl", children: [_jsx("div", { className: "lg:hidden", children: _jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "mr-2 h-[34px] w-[34px]", children: _jsx(Menu, { className: "h-5 w-5" }) }) }), _jsxs(SheetContent, { side: "left", className: "bg-sidebar flex h-full w-64 flex-col items-stretch justify-between", children: [_jsx(SheetTitle, { className: "sr-only", children: "Navigation Menu" }), _jsx(SheetHeader, { className: "flex justify-start text-left", children: _jsx(AppLogoIcon, { className: "h-6 w-6 fill-current text-black dark:text-white" }) }), _jsx("div", { className: "flex h-full flex-1 flex-col space-y-4 p-4", children: _jsxs("div", { className: "flex h-full flex-col justify-between text-sm", children: [_jsx("div", { className: "flex flex-col space-y-4", children: mainNavItems.map((item) => (_jsxs(Link, { href: item.href, className: "flex items-center space-x-2 font-medium", children: [item.icon && _jsx(Icon, { iconNode: item.icon, className: "h-5 w-5" }), _jsx("span", { children: item.title })] }, item.title))) }), _jsx("div", { className: "flex flex-col space-y-4", children: rightNavItems.map((item) => (_jsxs("a", { href: item.href, target: "_blank", rel: "noopener noreferrer", className: "flex items-center space-x-2 font-medium", children: [item.icon && _jsx(Icon, { iconNode: item.icon, className: "h-5 w-5" }), _jsx("span", { children: item.title })] }, item.title))) })] }) })] })] }) }), _jsx(Link, { href: "/dashboard", prefetch: true, className: "flex items-center space-x-2", children: _jsx(AppLogo, {}) }), _jsx("div", { className: "ml-6 hidden h-full items-center space-x-6 lg:flex", children: _jsx(NavigationMenu, { className: "flex h-full items-stretch", children: _jsx(NavigationMenuList, { className: "flex h-full items-stretch space-x-2", children: mainNavItems.map((item, index) => (_jsxs(NavigationMenuItem, { className: "relative flex h-full items-center", children: [_jsxs(Link, { href: item.href, className: cn(navigationMenuTriggerStyle(), page.url === item.href && activeItemStyles, 'h-9 cursor-pointer px-3'), children: [item.icon && _jsx(Icon, { iconNode: item.icon, className: "mr-2 h-4 w-4" }), item.title] }), page.url === item.href && (_jsx("div", { className: "absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white" }))] }, index))) }) }) }), _jsxs("div", { className: "ml-auto flex items-center space-x-2", children: [_jsxs("div", { className: "relative flex items-center space-x-1", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "group h-9 w-9 cursor-pointer", children: _jsx(Search, { className: "!size-5 opacity-80 group-hover:opacity-100" }) }), _jsx("div", { className: "hidden lg:flex", children: rightNavItems.map((item) => (_jsx(TooltipProvider, { delayDuration: 0, children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsxs("a", { href: item.href, target: "_blank", rel: "noopener noreferrer", className: "group text-accent-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", children: [_jsx("span", { className: "sr-only", children: item.title }), item.icon && _jsx(Icon, { iconNode: item.icon, className: "size-5 opacity-80 group-hover:opacity-100" })] }) }), _jsx(TooltipContent, { children: _jsx("p", { children: item.title }) })] }) }, item.title))) })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "size-10 rounded-full p-1", children: _jsxs(Avatar, { className: "size-8 overflow-hidden rounded-full", children: [_jsx(AvatarImage, { src: auth.user.avatar, alt: auth.user.name }), _jsx(AvatarFallback, { className: "rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white", children: getInitials(auth.user.name) })] }) }) }), _jsx(DropdownMenuContent, { className: "w-56", align: "end", children: _jsx(UserMenuContent, { user: auth.user }) })] })] })] }) }), breadcrumbs.length > 1 && (_jsx("div", { className: "border-sidebar-border/70 flex w-full border-b", children: _jsx("div", { className: "mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl", children: _jsx(Breadcrumbs, { breadcrumbs: breadcrumbs }) }) }))] }));
}
