import { MapStateToProps, Identifier } from "../types";
import { retrieveStore, defaultId } from "../stores";

function identity(thing: any): any {
  return thing;
}

/**
 * React Hook which retrieves the `store` for a given `identifer`.
 * @param mapStateToProps Callback which is used to select and return slices of the store (optional)
 * @param identifer The identifier used for the store (optional)
 * @returns The store instance
 */
function useStore(): any;
function useStore(identifer: Identifier): any;
function useStore(mapStateToProps: MapStateToProps): any;
function useStore(identifer: Identifier, mapStateToProps: MapStateToProps): any;

function useStore(
  identifer: MapStateToProps | Identifier = defaultId,
  mapStateToProps: MapStateToProps | null = null,
): any {
  if (typeof identifer === "function") {
    mapStateToProps = identifer;
    identifer = defaultId;
  }

  return retrieveStore(identifer).useStore(
    mapStateToProps === null ? identity : mapStateToProps,
  );
}

export default useStore;
