import React, { useContext, useRef } from "react";

const stores = new Map();

function identity(thing: any): any {
  return thing;
}

export interface StoreProvider {
  Provider: any;
  Consumer: any;
  useStore: Function;
  dispose: Function;
}

/**
 * React Hook used to instantiate a mobx-state-tree store from within a component.
 * @param storeFactory Callback used to create your mobx-state-tree store
 * @returns The instance created by your `storeFactory` function
 */
export function createStore(storeFactory: Function): any {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = storeFactory();
  }
  return storeRef.current;
}

/**
 * Create a new StoreProvider instance, which supplies you with a `Provider`, `Consumer`, and a `useStore` hook.
 * @param defaultValue The default value you want supplied to consumers of useStore in the event no Provider is found (null by default)
 * @returns A StoreProvider object which contains the Provider, Consumer, useStore hook, and dispose callback
 */
export default function StoreProvider(storeIdentifier: any = null, defaultValue: any = null): StoreProvider {
  if (!stores.has(storeIdentifier)) {
    const StoreContext = React.createContext(defaultValue);
    stores.set(storeIdentifier, {
      ...StoreContext,
      dispose: () => stores.delete(storeIdentifier),
      useStore: (mapStateToProps: Function = identity): any => {
        const store = useContext(StoreContext);
        return mapStateToProps(store);
      },
    });
  }
  return stores.get(storeIdentifier);
}
