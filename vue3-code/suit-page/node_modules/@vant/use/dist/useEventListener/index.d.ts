import { Ref } from 'vue';
declare type TargetRef = EventTarget | Ref<EventTarget | undefined>;
export declare type UseEventListenerOptions = {
    target?: TargetRef;
    capture?: boolean;
    passive?: boolean;
};
export declare function useEventListener<K extends keyof DocumentEventMap>(type: K, listener: (event: DocumentEventMap[K]) => void, options?: UseEventListenerOptions): void;
export declare function useEventListener(type: string, listener: EventListener, options?: UseEventListenerOptions): void;
export {};
