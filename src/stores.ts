import React, { useContext } from "react";
import { MapStateToProps, Store } from "./types";

const stores = new Map();

/**
 * Register/initialize a store in the internal `stores` Map.
 * @param storeIdentifier The identifier supplied by the consumer
 */
function registerStore(storeIdentifier: any) {
  const Context = React.createContext(null);
  Context.displayName = String(storeIdentifier);
  stores.set(storeIdentifier, {
    Context,
    useStore: (mapStateToProps: MapStateToProps): any =>
      mapStateToProps(useContext(Context)),
    dispose: () => stores.delete(storeIdentifier),
  });
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
  return stores.get(storeIdentifier);
}

export { retrieveStore };
