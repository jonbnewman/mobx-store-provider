import { useRef } from "react";
import { Factory } from "../types";

/**
 * React Hook used to instantiate a new store from within a component.
 * @param factory Callback used to create and return a store
 * @returns The instance created by the `factory` function
 */

function createStore(factory: Factory): any {
  return useRef(factory()).current;
}

export default createStore;
