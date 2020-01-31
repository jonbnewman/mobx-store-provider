import React, { useContext } from "react";
import { MapStateToProps, Store } from "./types";

const stores: Map<any, Store> = new Map();

/**
 * Register/initialize a store in the internal `stores` Map.
 * @param storeIdentifier The identifier supplied by the consumer
 */
function registerStore(storeIdentifier: any) {
  const Context = React.createContext(null);
  Context.displayName = String(storeIdentifier);
  const store: Store = {
    Context,
    useStore: (mapStateToProps: MapStateToProps): any =>
      mapStateToProps(useContext(Context)),
    disposeStore: () => {
      stores.delete(storeIdentifier);
    },
  };
  stores.set(storeIdentifier, store);
}

/**
 * Register and/or retrieve a `store` from the internal `stores` Map.
 * @param storeIdentifier The identifier supplied by the consumer
 * @returns Store
 */
function retrieveStore(storeIdentifier: any): Store {
  if (!stores.has(storeIdentifier)) {
    registerStore(storeIdentifier);
  }
  return <Store>stores.get(storeIdentifier);
}

export { retrieveStore };
