import React, { useContext, useRef, Consumer, Provider } from "react";

const stores = new Map();

function identity(thing: any): any {
  return thing;
}

interface StoreProvider {
  Provider: Provider<any>;
  Consumer: Consumer<any>;
  useStore: Function;
  dispose: Function;
}

/**
 * React Hook used to instantiate a mobx-state-tree store from within a component.
 * @param storeFactory Callback used to create your mobx-state-tree store
 * @returns The instance created by your `storeFactory` function
 */
function createStore(storeFactory: Function): any {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = storeFactory();
  }
  return storeRef.current;
}

/**
 * React Hook to create and/or retrieve the store `Provider` component using the supplied `storeIdentifier`.
 *
 * Use this wrapper to supply your application with a store.
 * @param storeIdentifier The identifier you use for your store (optional)
 */
function createProvider(storeIdentifier: any = null): Provider<any> {
  return retreiveStore(storeIdentifier).Provider;
}

/**
 * This will dispose the `store` identified by the `storeIdentifier`.
 * @param storeIdentifier The identifier you use for your store (optional)
 */
function disposeStore(storeIdentifier: any = null): undefined {
  return retreiveStore(storeIdentifier).dispose();
}

/**
 * React Hook which retrieves and returns the `store` from the `Provider` that supplies it.
 * @param storeIdentifier The identifier you use for your store (optional)
 */
function useStore(storeIdentifier: any = null, mapStateToProps: Function = identity): any {
  return retreiveStore(storeIdentifier).useStore(mapStateToProps);
}

/**
 * React Hook whick returns the React `Context.Consumer` component.
 *
 * You can use this as an alternative to Hooks for consuming your `store`.
 * @param storeIdentifier The identifier you use for your store (optional)
 */
function useConsumer(storeIdentifier: any = null): Consumer<any> {
  return retreiveStore(storeIdentifier).Consumer;
}

/**
 * Creates and/or retreives the store from the internal `stores` Map.
 * @param storeIdentifier The identifier supplied by the consumer
 */
function retreiveStore(storeIdentifier: any = null): StoreProvider {
  if (!stores.has(storeIdentifier)) {
    const StoreContext = React.createContext(null);
    StoreContext.displayName = String(storeIdentifier);
    stores.set(storeIdentifier, {
      ...StoreContext,
      useStore: (mapStateToProps: Function = identity): any => {
        const store = useContext(StoreContext);
        return mapStateToProps(store);
      },
      dispose: () => stores.delete(storeIdentifier),
    });
  }
  return stores.get(storeIdentifier);
}

export { createStore, createProvider, disposeStore, useStore, useConsumer };
