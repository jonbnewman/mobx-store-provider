import { Provider, useMemo } from "react";
import { Instance } from "mobx-state-tree";
import { retrieveStore } from "./stores";

/**
 * React Hook to retrieve the store `Provider` for a given `identifier`.
 *
 * Use this wrapper to supply your application with a store.
 * @param identifier The identifier used for the store (optional)
 * @returns The Provider
 */
function useProvider<M>(Model: M): Provider<Instance<typeof Model>> {
  return retrieveStore(Model).Provider;
}

/**
 * React Hook used to instantiate a new store from within a component.
 * @param factory Callback used to create and return a store
 * @returns The instance created by the `factory` function
 */
function useCreateStore<M, S>(Model: M, snapshot: S) {
  return useMemo(() => {
    return (Model as any).create(snapshot);
  }, []) as Instance<typeof Model>;
}

/**
 * React Hook which retrieves the `store` for a given `identifer`.
 * @param identifer The identifier used for the store (optional)
 * @param mapStore Callback which is used to select and return slices of the store (optional)
 * @returns The store instance
 */
function useStore<M>(Model: M) {
  return retrieveStore(Model).useStore() as Instance<typeof Model>;
}

export { useProvider, useCreateStore, useStore };
