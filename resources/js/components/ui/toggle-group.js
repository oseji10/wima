import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";
const ToggleGroupContext = React.createContext({
    size: "default",
    variant: "default",
});
function ToggleGroup({ className, variant, size, children, ...props }) {
    return (_jsx(ToggleGroupPrimitive.Root, { "data-slot": "toggle-group", "data-variant": variant, "data-size": size, className: cn("group/toggle-group flex items-center rounded-md data-[variant=outline]:shadow-xs", className), ...props, children: _jsx(ToggleGroupContext.Provider, { value: { variant, size }, children: children }) }));
}
function ToggleGroupItem({ className, children, variant, size, ...props }) {
    const context = React.useContext(ToggleGroupContext);
    return (_jsx(ToggleGroupPrimitive.Item, { "data-slot": "toggle-group-item", "data-variant": context.variant || variant, "data-size": context.size || size, className: cn(toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
        }), "min-w-0 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l", className), ...props, children: children }));
}
export { ToggleGroup, ToggleGroupItem };
