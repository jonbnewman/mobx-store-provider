import { retrieveStore } from "../stores";

/**
 * Dispose the `store` identified by the `storeIdentifier`.
 * @param storeIdentifier The identifier used for the store (optional)
 */
function disposeStore(storeIdentifier: any = null): undefined {
  return retrieveStore(storeIdentifier).dispose();
}

export default disposeStore;
