import { MapStateToProps, Identifier } from "../types";
import { retrieveStore, defaultId } from "../stores";

function identity(thing: any): any {
  return thing;
}

/**
 * React Hook which retrieves the `store` for a given `identifer`.
 * @param identifer The identifier used for the store (optional)
 * @param mapStateToProps Callback which is used to select and return slices of the store (optional)
 * @returns The store instance
 */
function useStore(): any;
function useStore(identifer: Identifier): any;
function useStore(mapStateToProps: MapStateToProps): any;
function useStore(identifer: Identifier, mapStateToProps: MapStateToProps): any;
function useStore(
  identifer: MapStateToProps | Identifier = defaultId,
  mapStateToProps: MapStateToProps = identity,
): any {
  if (typeof identifer === "function") {
    mapStateToProps = identifer;
    identifer = defaultId;
  }
  return retrieveStore(identifer).useStore(mapStateToProps);
}

export default useStore;
