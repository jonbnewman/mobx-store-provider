import { retrieveStore } from "../stores";
import { MapStateToProps } from "../types";

function identity(thing: any): any {
  return thing;
}

/**
 * React Hook which retrieves the `store` for a given `storeIdentifier`.
 * @param mapStateToProps Callback which is used to select and return slices of the store (optional)
 * @param storeIdentifier The identifier used for the store (optional)
 * @returns The store instance
 */
function useStore(
  mapStateToProps: MapStateToProps | null = null,
  storeIdentifier: any = null,
): any {
  return retrieveStore(storeIdentifier).useStore(
    mapStateToProps === null ? identity : mapStateToProps,
  );
}

export default useStore;
