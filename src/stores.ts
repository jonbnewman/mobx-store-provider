import React, { useContext, Provider } from "react";

/**
 * Internal Store representation.
 */
export interface Store {
  Provider: Provider<any>;
  useStore: () => any;
}

const stores: Map<any, Store> = new Map();

/**
 * Register and/or retrieve a `store` from the internal `stores` Map.
 * @param identifier The identifier supplied by the consumer
 * @returns Store
 */
function retrieveStore(identifier: any): Store {
  if (!stores.has(identifier)) {
    const Context = React.createContext<any>(null);
    Context.displayName = String(identifier);
    stores.set(identifier, <Store>{
      Provider: Context.Provider,
      useStore: () => useContext(Context),
    });
  }
  return <Store>stores.get(identifier);
}

export { retrieveStore };
