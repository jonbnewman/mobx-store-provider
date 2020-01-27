import React, { useContext } from "react";

interface Store {
  Context: any;
  useStore: Function;
  dispose: Function;
}

const stores = new Map();

function identity(thing: any): any {
  return thing;
}

/**
 * Creates and/or retrieves the `store` from the internal `stores` Map.
 * @param storeIdentifier The identifier supplied by the consumer
 * @returns Store
 */
function retrieveStore(storeIdentifier: any = null): Store {
  if (!stores.has(storeIdentifier)) {
    const Context = React.createContext(null);
    Context.displayName = String(storeIdentifier);
    stores.set(storeIdentifier, {
      Context,
      useStore: (mapStateToProps: Function = identity): any =>
        mapStateToProps(useContext(Context)),
      dispose: () => stores.delete(storeIdentifier),
    });
  }
  return stores.get(storeIdentifier);
}

export { retrieveStore, identity };
