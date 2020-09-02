import React, { useContext } from "react";
import { Store, Identifier } from "./types";

const stores: Map<Identifier, Store> = new Map();
const defaultId: Identifier = Symbol("store");

declare let process: {
  env: {
    NODE_ENV: string;
  };
};

/**
 * Register/initialize a store in the internal `stores` Map.
 * @param identifier The identifier supplied by the consumer
 * @returns void
 */
function registerStore(identifier: Identifier): void {
  const Context = React.createContext(null);
  Context.displayName = String(identifier);
  stores.set(identifier, <Store>{
    Provider: Context.Provider,
    useStore: (mapStore) => mapStore(useContext(Context)),
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

/**
 * Identity function, returns what was passed to it.
 * @param thing The thing you want the identity of
 * @returns thing
 */
function identity(thing: any): any {
  return thing;
}

export { retrieveStore, defaultId, identity };
