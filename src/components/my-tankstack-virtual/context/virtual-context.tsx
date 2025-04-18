import {createStore, StoreApi} from "zustand/vanilla";
import {TReturnHook} from "@/components/my-tankstack-virtual/hooks/index.type.ts";
import {createContext, FC, ReactNode, useContext, useMemo} from "react";
import {useStore} from "zustand/react";

type TVirtualStore = Partial<TReturnHook<HTMLDivElement, Element>>;

type TParameterContext = {
    store: TVirtualStore;
    children: ReactNode
}
const createVirtualStore = (store: TVirtualStore) => createStore<TVirtualStore>(() => store);

const VirtualContext = createContext<StoreApi<TVirtualStore> | null>(null);

export const VirtualProvider: FC<TParameterContext> = ({children, store}) => {
    const __store = useMemo(() => createVirtualStore(store), []);
    return <VirtualContext.Provider value={__store}>
        {children}
    </VirtualContext.Provider>
};

export const useSelectorVirtualContext = <TSelected = any>(selector: (data: TVirtualStore) => TSelected) => {
    const store = useContext(VirtualContext);
    if (!store) {
        // throw new Error('VirtualContext must be used within a VirtualProvider');
        return null;
    }
    return useStore(store, selector);
};
