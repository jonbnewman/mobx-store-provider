import { useMemo, createContext, useContext, Context, Provider } from "react";
import { IAnyModelType, Instance } from "mobx-state-tree";

interface Store {
  Provider: Provider<any>;
  context: Context<any>;
}

const stores = new Map<any, Store>();

/**
 * Register and/or retrieve a `store`.
 * @param identifier The identifier supplied by the consumer
 * @returns Store
 */
function retrieveStore(identifier: any): Store {
  if (!stores.has(identifier)) {
    const Context = createContext<any>(null);
    Context.displayName = String(identifier);
    stores.set(identifier, {
      get Provider() {
        return Context.Provider;
      },
      get context() {
        return useContext(Context);
      },
    });
  }
  return <Store>stores.get(identifier);
}

/**
 * React Hook used to retrieve a store `Provider`.
 * @param model mobx-state-tree types.model()
 * @param identifier The identifier used for the store (optional)
 * @returns The Provider
 */
function useProvider<M extends IAnyModelType>(model: M, identifier?: any) {
  return retrieveStore(arguments.length === 2 ? identifier : model)
    .Provider as Provider<Instance<typeof model>>;
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
 * React Hook used to retrieve a store.
 * @param model mobx-state-tree types.model()
 * @param identifier The identifier used for the store (optional)
 * @returns The store instance
 */
function useStore<M extends IAnyModelType>(model: M, identifier?: any) {
  return retrieveStore(arguments.length === 2 ? identifier : model)
    .context as Instance<typeof model>;
}

export { useProvider, useCreateStore, useStore };
