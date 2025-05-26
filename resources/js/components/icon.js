import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
export function Icon({ iconNode: IconComponent, className, ...props }) {
    return _jsx(IconComponent, { className: cn('h-4 w-4', className), ...props });
}
