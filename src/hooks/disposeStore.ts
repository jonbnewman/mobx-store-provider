import { retrieveStore } from "../tools";

/**
 * This will dispose the `store` identified by the `storeIdentifier`.
 * @param storeIdentifier The identifier used for the store (optional)
 */
function disposeStore(storeIdentifier: any = null): undefined {
  return retrieveStore(storeIdentifier).dispose();
}

export default disposeStore;
