import { Provider } from "react";

/**
 * Internal Store representation.
 */
export interface Store {
  Provider: Provider<any>;
  useStore: (mapStateToProps: MapStateToProps) => any;
}

/**
 * Identifier the user passes into hooks calls.
 *
 * Used for store identification/access.
 */
export type Identifier = string | number | object | symbol | null | Array<any>;

/**
 * Function the user passes into the createStore hook.
 *
 * This function should instantiate and return a new instance of a store.
 */
export type Factory = () => any;

/**
 * Function the user passes into the useStore hook.
 *
 * Used to return a subset/slice of the store.
 */
export type MapStateToProps = (store: any) => any;
