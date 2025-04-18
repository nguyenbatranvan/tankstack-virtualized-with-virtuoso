import {ComponentProps, FC, forwardRef, ReactNode} from "react";
import {VirtualItem, Virtualizer} from "@tanstack/react-virtual";
import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import {useSelectorVirtualContext} from "@/components/my-tankstack-virtual/context";

type ComponentPropsDiv = ComponentProps<'div'>;
type TRoot = ComponentPropsDiv & {};
type TContainerScroll = ComponentPropsDiv & {
    getTotalSize?: number;
    items?: VirtualItem[];
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Root = forwardRef<HTMLDivElement, TRoot>((props, ref) => {
    const {style, className, ...rest} = props;
    return <div ref={ref}
                className={cn("", className)}
                style={{
                    height: 200,
                    width: 400,
                    contain: 'strict',
                    ...style,
                    overflow: 'auto'
                }} {...rest}/>
})

const ContainerScroll: FC<TContainerScroll> = ({getTotalSize, items, className, children, ...rest}) => {
    const getTotalSizeContext = useSelectorVirtualContext(state => state.getTotalSize)
    const itemsContext = useSelectorVirtualContext(state => state.getVirtualItems)
    return <div
        className={cn("", className)}
        style={{
            height: `${getTotalSize || getTotalSizeContext?.()}px`,
            width: '100%',
            position: 'relative',
        }}
        {...rest}
    >
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${(items || itemsContext?.())?.[0]?.start ?? 0}px)`,
            }}
        >
            {children}
        </div>
    </div>
}

type TItem = Omit<ComponentPropsDiv, "children"> & {
    getVirtualItems?: VirtualItem[];
    measureElement?: Virtualizer<HTMLDivElement, Element>['measureElement'];
    children: (index: number) => ReactNode;
}
const Item = (props: TItem) => {
    const {getVirtualItems, measureElement, children, className, style, ...rest} = props;
    const getVirtualItemsContext = useSelectorVirtualContext(state => state.getVirtualItems)
    const measureElementContext = useSelectorVirtualContext(state => state.measureElement)
    return <>
        {
            (getVirtualItems || getVirtualItemsContext?.())?.map(virtualColumn => <div
                key={virtualColumn.key}
                data-index={virtualColumn.index}
                ref={measureElement || measureElementContext}
                className={cn("", className)}
                {...rest}>
                {children?.(virtualColumn.index)}
            </div>)
        }
    </>
}


export const Virtual = {
    Root,
    ContainerScroll,
    Item
}
