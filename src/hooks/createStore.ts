import { useRef, useEffect } from "react";
import { retrieveStore } from "../stores";
import { Factory } from "../types";

/**
 * React Hook used to instantiate a new store from within a component.
 * @param factory Callback used to create and return a store
 * @param storeIdentifier The identifier used for the store (optional)
 * @returns The instance created by the `factory` function
 */
function createStore(factory: Factory, storeIdentifier: any = null): any {
  useEffect(() => () => retrieveStore(storeIdentifier).disposeStore(), []);
  return useRef(factory()).current;
}

export default createStore;
