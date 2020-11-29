import { Provider } from "react";

/**
 * Internal Store representation.
 */
export interface Store {
  Provider: Provider<any>;
  useStore: () => any;
}

/**
 * Identifier the user passes into hooks calls.
 *
 * Used for store identification/access.
 */
export type Identifier = any;
