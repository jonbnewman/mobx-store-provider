import { Provider, useMemo } from "react";
import { IAnyModelType, Instance } from "mobx-state-tree";
import { retrieveStore } from "./stores";

/**
 * React Hook to retrieve the store `Provider` for a given `identifier`.
 *
 * Use this wrapper to supply your application with a store.
 * @param model mobx-state-tree types.model()
 * @param identifier The identifier used for the store (optional)
 * @returns The Provider
 */
function useProvider<M extends IAnyModelType>(
  model: M,
  identifier?: any,
): Provider<Instance<typeof model>> {
  return retrieveStore(arguments.length === 2 ? identifier : model).Provider;
}

/**
 * React Hook used to instantiate a new store from within a component.
 * @param model mobx-state-tree types.model()
 * @param snapshot input snapshot used during creation (optional)
 * @returns The instance created by the `factory` function
 */
function useCreateStore<M extends IAnyModelType>(
  model: M,
  snapshot?: any,
  env?: any,
) {
  return useMemo(() => model.create(snapshot, env), []) as Instance<
    typeof model
  >;
}

/**
 * React Hook which retrieves the `store` for a given `identifer`.
 * @param model mobx-state-tree types.model()
 * @param identifier The identifier used for the store (optional)
 * @returns The store instance
 */
function useStore<M extends IAnyModelType>(model: M, identifier?: any) {
  return retrieveStore(
    arguments.length === 2 ? identifier : model,
  ).useStore() as Instance<typeof model>;
}

export { useProvider, useCreateStore, useStore };
