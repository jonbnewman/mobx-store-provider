import { useRef, useEffect } from "react";
import { retrieveStore } from "../stores";
import { StoreFactory } from "../types";

/**
 * React Hook used to instantiate a new store from within a component.
 * @param storeFactory Callback used to create and return a store
 * @param storeIdentifier The identifier used for the store (optional)
 * @returns The instance created by the `storeFactory` function
 */
function createStore(
  storeFactory: StoreFactory,
  storeIdentifier: any = null,
): any {
  useEffect(() => () => retrieveStore(storeIdentifier).disposeStore(), []);
  return useRef(storeFactory()).current;
}

export default createStore;
