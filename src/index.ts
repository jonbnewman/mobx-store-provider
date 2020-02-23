import { Provider } from "react";
import { Identifier, Factory, MapStateToProps } from "./types";
import { retrieveStore, defaultId } from "./stores";
import { useRef } from "react";

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

/**
 * React Hook used to instantiate a new store from within a component.
 * @param factory Callback used to create and return a store
 * @returns The instance created by the `factory` function
 */
function createStore(factory: Factory): any;
function createStore(factory: Factory): any {
  return useRef(factory()).current;
}

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

export { useProvider, createStore, useStore };
