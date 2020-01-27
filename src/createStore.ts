import { useRef } from "react";

/**
 * React Hook used to instantiate a new store from within a component.
 * @param storeFactory Callback used to create and return a store
 * @returns The instance created by the `storeFactory` function
 */
function createStore(storeFactory: Function): any {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = storeFactory();
  }
  return storeRef.current;
}

export default createStore;
