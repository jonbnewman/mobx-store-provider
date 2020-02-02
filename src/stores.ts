import React, { useContext } from "react";
import { Store, Identifier } from "./types";

const stores: Map<Identifier, Store> = new Map();
const defaultId = null;

/**
 * Register/initialize a store in the internal `stores` Map.
 * @param identifier The identifier supplied by the consumer
 */
function registerStore(identifier: Identifier): void {
  const Context = React.createContext(null);
  Context.displayName = String(identifier);
  const store: Store = {
    useProvider: () => Context.Provider,
    useStore: mapStateToProps => mapStateToProps(useContext(Context)),
  };
  stores.set(identifier, store);
}

/**
 * Register and/or retrieve a `store` from the internal `stores` Map.
 * @param identifier The identifier supplied by the consumer
 * @returns Store
 */
function retrieveStore(identifier: Identifier): Store {
  if (!stores.has(identifier)) {
    registerStore(identifier);
  }
  return <Store>stores.get(identifier);
}

export { retrieveStore, defaultId };
