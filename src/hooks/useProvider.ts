import { Provider } from "react";
import { Identifier } from "../types";
import { retrieveStore, defaultId } from "../stores";

/**
 * React Hook to retrieve the store `Provider` for a given `identifier`.
 *
 * Use this wrapper to supply your application with a store.
 * @param identifier The identifier used for the store (optional)
 * @returns The Provider
 */
function useProvider(): Provider<any>;
function useProvider(identifier: Identifier): Provider<any>;

function useProvider(identifier: Identifier = defaultId): Provider<any> {
  return retrieveStore(identifier).useProvider();
}

export default useProvider;
