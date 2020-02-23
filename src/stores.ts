import React, { useContext } from "react";
import { Store, Identifier } from "./types";

const stores: Map<Identifier, Store> = new Map();
const defaultId: Identifier = null;

/**
 * Register/initialize a store in the internal `stores` Map.
 * @param identifier The identifier supplied by the consumer
 */
function registerStore(identifier: Identifier): void {
  const Context = React.createContext(null);
  Context.displayName = String(identifier);
  stores.set(identifier, <Store>{
    useProvider: () => Context.Provider,
    useStore: mapStateToProps => mapStateToProps(useContext(Context)),
  });
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

function identity(thing: any): any {
  return thing;
}

export { retrieveStore, defaultId, identity };
