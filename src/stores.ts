import React, { useContext } from "react";
import { Store } from "./types";

const stores: Map<any, Store> = new Map();
const defaultId = null;

/**
 * Register/initialize a store in the internal `stores` Map.
 * @param identifier The identifier supplied by the consumer
 * @returns void
 */
function registerStore(identifier: any): void {
  const Context = React.createContext<any>(null);
  Context.displayName = String(identifier);
  stores.set(identifier, <Store>{
    Provider: Context.Provider,
    useStore: () => useContext(Context),
  });
}

/**
 * Register and/or retrieve a `store` from the internal `stores` Map.
 * @param identifier The identifier supplied by the consumer
 * @returns Store
 */
function retrieveStore<T>(identifier: T): Store {
  if (!stores.has(identifier)) {
    registerStore(identifier);
  }
  return <Store>stores.get(identifier);
}

export { retrieveStore, defaultId };
