import { Provider } from "react";
import { retrieveStore } from "../tools";

/**
 * React Hook to retrieve the store `Provider` component for a given `storeIdentifier`.
 *
 * Use this wrapper to supply your application with a store.
 * @param storeIdentifier The identifier used for the store (optional)
 * @returns The Provider
 */
function useProvider(storeIdentifier: any = null): Provider<any> {
  return retrieveStore(storeIdentifier).Context.Provider;
}

export default useProvider;
