import { Provider, useMemo } from "react";
import { IModelType, Instance } from "mobx-state-tree";
import { Identifier, Factory } from "./types";
import { retrieveStore, defaultId } from "./stores";

/**
 * React Hook to retrieve the store `Provider` for a given `identifier`.
 *
 * Use this wrapper to supply your application with a store.
 * @param identifier The identifier used for the store (optional)
 * @returns The Provider
 */
function useProvider(identifier: Identifier = defaultId): Provider<any> {
  return retrieveStore(identifier).Provider;
}

/**
 * React Hook used to instantiate a new store from within a component.
 * @param factory Callback used to create and return a store
 * @returns The instance created by the `factory` function
 */
function useCreateStore<T, S>(Model: T, snapshot: S): Instance<typeof Model> {
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
function useStore<T>(identifer: T): Instance<T> {
  return retrieveStore(identifer).useStore() as Instance<typeof identifer>;
}

export { useProvider, useCreateStore, useStore };
