import React, { useContext } from "react";

interface Store {
  Context: any;
  useStore: Function;
  dispose: Function;
}

const stores = new Map();

function registerStore(storeIdentifier: any = null): Store {
  const Context = React.createContext(null);
  Context.displayName = String(storeIdentifier);

  const store: Store = {
    Context,
    useStore: (mapStateToProps: Function): any =>
      mapStateToProps(useContext(Context)),
    dispose: () => stores.delete(storeIdentifier),
  };

  stores.set(storeIdentifier, store);

  return store;
}

/**
 * Register and/or retrieve a `store` from the internal `stores` Map.
 * @param storeIdentifier The identifier supplied by the consumer
 * @returns Store
 */
function retrieveStore(storeIdentifier: any = null): Store {
  if (!stores.has(storeIdentifier)) {
    registerStore(storeIdentifier);
  }
  return stores.get(storeIdentifier);
}

export { retrieveStore };
