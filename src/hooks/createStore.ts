import { useRef, useEffect } from "react";
import { retrieveStore } from "../stores";
import { StoreFactory } from "../types";

/**
 * useEffect callback which disposes of the store when it is removed from the DOM
 * @param storeIdentifier The identifier supplied by the consumer
 */
function storeDisposal(storeIdentifier: any = null) {
  return () => () => retrieveStore(storeIdentifier).dispose();
}

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
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = storeFactory();
  }

  useEffect(storeDisposal(storeIdentifier), []);

  return storeRef.current;
}

export default createStore;
