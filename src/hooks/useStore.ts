import { retrieveStore, identity } from "../tools";

/**
 * React Hook which retrieves the `store` from the `Provider` for a given `storeIdentifier`.
 * @param storeIdentifier The identifier used for the store (optional)
 * @param mapStateToProps Callback which is used to select and return slices of the store (optional)
 * @returns The store instance
 */
function useStore(
  storeIdentifier: any = null,
  mapStateToProps: Function = identity,
): any {
  return retrieveStore(storeIdentifier).useStore(mapStateToProps);
}

export default useStore;
