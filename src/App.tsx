import "./styles.css"
import {Virtual} from "@/components/my-tankstack-virtual/ui/virtual.tsx";
import {useCustomVirtualizer} from "@/components/my-tankstack-virtual/hooks";
import {VirtualProvider} from "@/components/my-tankstack-virtual/context";

const data = Array.from({length: 10000}, (_, i) => ({id: i, name: `Item ${i}`}));


const App = () => {
    return <div className={"grid grid-cols-2 gap-4 p-2"}>
        <div className={"border-2 border-dashed p-2 rounded-md"}>
            <h1 className={"font-bold "}>With Context</h1>
            <VirtualWithContext/>
        </div>
        <div className={"border-2 border-dashed p-2 rounded-md"}>
            <h1 className={"font-bold"}>Without Context</h1>
            <VirtualWithOutContext/>
        </div>
    </div>
};

export default App;

// Without Context

export const VirtualWithContext = () => {
    const {ref, ...store} = useCustomVirtualizer({
        count: data?.length,
        estimateSize: () => 45,
        overscan: 5,
    })
    return (
        <VirtualProvider store={store}>
            <Virtual.Root ref={ref}>
                <Virtual.ContainerScroll>
                    <Virtual.Item>
                        {(i) => data[i].name}
                    </Virtual.Item>
                </Virtual.ContainerScroll>
            </Virtual.Root>
        </VirtualProvider>
    );
}

export const VirtualWithOutContext = () => {
    const {getVirtualItems, getTotalSize, measureElement, ref} = useCustomVirtualizer({
        count: data?.length,
        estimateSize: () => 45,
        overscan: 5,
    })
    return (
        <Virtual.Root ref={ref}>
            <Virtual.ContainerScroll items={getVirtualItems()} getTotalSize={getTotalSize()}>
                <Virtual.Item getVirtualItems={getVirtualItems()} measureElement={measureElement}>
                    {(i) => data[i].name}
                </Virtual.Item>
            </Virtual.ContainerScroll>
        </Virtual.Root>
    );
}
