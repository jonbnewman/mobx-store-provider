import { useRef, useEffect } from "react";
import { Factory, Identifier } from "../types";
import { retrieveStore, defaultId } from "../stores";

/**
 * React Hook used to instantiate a new store from within a component.
 * @param factory Callback used to create and return a store
 * @param identifier The identifier used for the store (optional)
 * @returns The instance created by the `factory` function
 */
function createStore(factory: Factory): any;
function createStore(identifier: Identifier, factory: Factory): any;

function createStore(
  identifier: Factory | Identifier = defaultId,
  factory?: Factory,
): any {
  if (typeof identifier === "function") {
    factory = identifier;
    identifier = null;
  }

  // @ts-ignore
  const store = factory();

  useEffect(() => () => retrieveStore(identifier).disposeStore(), []);
  return useRef(store).current;
}

export default createStore;
