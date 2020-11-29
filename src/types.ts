import { Provider } from "react";

/**
 * Internal Store representation.
 */
export interface Store {
  Provider: Provider<any>;
  useStore: () => any;
}
