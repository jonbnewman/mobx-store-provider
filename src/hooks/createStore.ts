import { useRef, useEffect } from "react";
import { retrieveStore } from "../stores";

function storeDisposal(storeIdentifier: any = null) {
  return () => retrieveStore(storeIdentifier).dispose();
}

/**
 * React Hook used to instantiate a new store from within a component.
 * @param storeFactory Callback used to create and return a store
 * @returns The instance created by the `storeFactory` function
 */
function createStore(storeIdentifier: any = null, storeFactory: Function): any {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = storeFactory();
  }

  useEffect(storeDisposal(storeIdentifier), []);

  return storeRef.current;
}

export default createStore;
