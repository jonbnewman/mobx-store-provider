import { Provider, useMemo } from "react";
import { Identifier, Factory, MapStore } from "./types";
import { retrieveStore, defaultId, identity, warning } from "./stores";

/**
 * React Hook to retrieve the store `Provider` for a given `identifier`.
 *
 * Use this wrapper to supply your application with a store.
 * @param identifier The identifier used for the store (optional)
 * @returns The Provider
 */
function useProvider(): Provider<any>;
function useProvider(identifier: Identifier): Provider<any>;
function useProvider(identifier: Identifier = defaultId): Provider<any> {
  return retrieveStore(identifier).Provider;
}

/**
 * Deprecated, switch to useCreateStore - to be removed.
 */
function createStore(factory: Factory): any;
function createStore(factory: Factory): any {
  warning(
    "createStore is deprecated and will be removed, migrate to useCreateStore soon",
  );
  return useCreateStore(factory);
}

/**
 * React Hook used to instantiate a new store from within a component.
 * @param factory Callback used to create and return a store
 * @returns The instance created by the `factory` function
 */
function useCreateStore(factory: Factory): any;
function useCreateStore(factory: Factory): any {
  return useMemo(factory, []);
}

/**
 * React Hook which retrieves the `store` for a given `identifer`.
 * @param identifer The identifier used for the store (optional)
 * @param mapStore Callback which is used to select and return slices of the store (optional)
 * @returns The store instance
 */
function useStore(): any;
function useStore(identifer: Identifier): any;
function useStore(mapStore: MapStore): any;
function useStore(identifer: Identifier, mapStore: MapStore): any;
function useStore(
  identifer: MapStore | Identifier = defaultId,
  mapStore: MapStore = identity,
): any {
  return typeof identifer === "function"
    ? retrieveStore(defaultId).useStore(<MapStore>identifer)
    : retrieveStore(identifer).useStore(mapStore);
}

export { useProvider, createStore, useCreateStore, useStore };
