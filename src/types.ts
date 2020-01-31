import { Context } from "react";

/**
 * Internal Store representation.
 */
export interface Store {
  Context: Context<any>;
  useStore: UseStore;
  disposeStore: DisposeStore;
}

/**
 * Function passed to the useStore hook.
 *
 * Specifies a `mapStateToProps` callback which is used to return a subset/slice of the store.
 */
export type UseStore = (mapStateToProps: MapStateToProps) => any;

/**
 * Function used to dispose the reference in the stores map
 */
export type DisposeStore = () => void;

/**
 * Function the user passes into the createStore hook.
 *
 * This function should instantiate and return a new instance of a store.
 */
export type StoreFactory = (...args: any[]) => any;

/**
 * Function used to return a subset/slice of the store
 */
export type MapStateToProps = (store: any) => any;
