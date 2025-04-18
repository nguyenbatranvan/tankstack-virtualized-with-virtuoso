import {PartialKeys, Virtualizer, VirtualizerOptions} from "@tanstack/react-virtual";

export type THook<TScrollElement extends Element, TItemElement extends Element> = PartialKeys<
    VirtualizerOptions<TScrollElement, TItemElement>,
    'observeElementRect' | 'observeElementOffset' | 'scrollToFn' | "estimateSize" | "getScrollElement"
>;

export type TReturnHook<TScrollElement extends Element, TItemElement extends Element> =
    Virtualizer<TScrollElement, TItemElement>
