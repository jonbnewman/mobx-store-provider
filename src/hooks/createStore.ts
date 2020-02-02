import { useRef, useEffect } from "react";
import { Factory, Identifier } from "../types";
import { retrieveStore } from "../stores";

/**
 * React Hook used to instantiate a new store from within a component.
 * @param factory Callback used to create and return a store
 * @param identifier The identifier used for the store (optional)
 * @returns The instance created by the `factory` function
 */
function createStore(factory: Factory): any;
function createStore(identifier: Identifier, factory: Factory): any;

function createStore(identifier: Factory | Identifier, factory?: Factory): any {
  if (typeof identifier === "function") {
    factory = identifier;
    identifier = null;
  }
  useEffect(() => () => retrieveStore(identifier).disposeStore(), []);
  return useRef((<Factory>factory)()).current;
}

export default createStore;
