import {useVirtualizer} from "@tanstack/react-virtual";
import {THook, TReturnHook} from "@/components/my-tankstack-virtual/hooks/index.type";
import {RefObject, useRef} from "react";

export const useCustomVirtualizer = <TScrollElement extends HTMLDivElement, TItemElement extends Element>(options: THook<TScrollElement, TItemElement>): TReturnHook<TScrollElement, TItemElement> & {
    ref: RefObject<TScrollElement>;
} => {
    const ref = useRef<TScrollElement>(null);
    const virtual = useVirtualizer({
        overscan: 10,
        estimateSize: () => 45,
        getScrollElement: () => ref.current,
        ...options
    })
    // @ts-ignore
    return {
        ...virtual,
        ref
    }
}
