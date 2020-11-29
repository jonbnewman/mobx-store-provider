import { Provider, useMemo } from "react";
import { Instance } from "mobx-state-tree";
import { defaultId, retrieveStore } from "./stores";

/**
 * React Hook to retrieve the store `Provider` for a given `identifier`.
 *
 * Use this wrapper to supply your application with a store.
 * @param model mobx-state-tree types.model()
 * @param identifier The identifier used for the store (optional)
 * @returns The Provider
 */
function useProvider<M>(
  model: M,
  identifier: any = defaultId,
): Provider<Instance<typeof model>> {
  return retrieveStore(identifier ? identifier : model).Provider;
}

/**
 * React Hook used to instantiate a new store from within a component.
 * @param model mobx-state-tree types.model()
 * @param snapshot input snapshot used during creation (optional)
 * @returns The instance created by the `factory` function
 */
function useCreateStore<M>(model: M, snapshot = {}) {
  return useMemo(() => (model as any).create(snapshot), []) as Instance<
    typeof model
  >;
}

/**
 * React Hook which retrieves the `store` for a given `identifer`.
 * @param model mobx-state-tree types.model()
 * @param identifier The identifier used for the store (optional)
 * @returns The store instance
 */
function useStore<M>(model: M, identifier: any = defaultId) {
  return retrieveStore(identifier ? identifier : model).useStore() as Instance<
    typeof model
  >;
}

export { useProvider, useCreateStore, useStore };
