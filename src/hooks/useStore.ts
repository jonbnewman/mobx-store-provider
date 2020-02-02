import { MapStateToProps, Identifier } from "../types";
import { retrieveStore, defaultId } from "../stores";

function identity(thing: any): any {
  return thing;
}

/**
 * React Hook which retrieves the `store` for a given `storeIdentifier`.
 * @param mapStateToProps Callback which is used to select and return slices of the store (optional)
 * @param storeIdentifier The identifier used for the store (optional)
 * @returns The store instance
 */
function useStore(): any;
function useStore(storeIdentifier: Identifier): any;
function useStore(mapStateToProps: MapStateToProps): any;
function useStore(
  storeIdentifier: Identifier,
  mapStateToProps: MapStateToProps,
): any;

function useStore(
  storeIdentifier: MapStateToProps | Identifier = defaultId,
  mapStateToProps: MapStateToProps | null = null,
): any {
  if (typeof storeIdentifier === "function") {
    mapStateToProps = storeIdentifier;
    storeIdentifier = null;
  }

  return retrieveStore(storeIdentifier).useStore(
    mapStateToProps === null ? identity : mapStateToProps,
  );
}

export default useStore;
