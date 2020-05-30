import { Provider, useRef } from "react";
import { Identifier, Factory, MapStore } from "./types";
import { retrieveStore, defaultId, identity } from "./stores";

declare var process: {
  env: {
    NODE_ENV: string;
  };
};

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
 * Deprecated - to be removed in 1.5.1
 */
function createStore(factory: Factory): any;
function createStore(factory: Factory): any {
  process.env.NODE_ENV.match(/^(test|dev).*/) &&
    console.warn(
      "createStore() has been deprecated and will be removed in the next release, please migrate to useCreateStore soon",
    );
  return useRef(factory()).current;
}

/**
 * React Hook used to instantiate a new store from within a component.
 * @param factory Callback used to create and return a store
 * @returns The instance created by the `factory` function
 */
function useCreateStore(factory: Factory): any;
function useCreateStore(factory: Factory): any {
  return useRef(factory()).current;
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
