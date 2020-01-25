import React, { useContext, useRef } from "react";

function identity(thing: any): any {
  return thing;
}

export interface StoreProvider {
  Provider: any;
  Consumer: any;
  useStore: Function;
}

export function createStore(storeFactory: Function) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = storeFactory();
  }
  return storeRef.current;
}

/**
 * Create a new StoreProvider instance, which supplies you with a `Provider`, `Consumer`, and a `useStore` hook.
 * @param defaultValue The default value you want supplied to consumers of useStore in the event no Provider is found (null by default)
 */
export default function StoreProvider(defaultValue = null): StoreProvider {
  const StoreContext = React.createContext(defaultValue);
  return {
    Provider: StoreContext.Provider,
    Consumer: StoreContext.Consumer,
    useStore: (mapStateToProps: Function = identity): any => {
      const store = useContext(StoreContext);
      return mapStateToProps(store);
    },
  };
}
