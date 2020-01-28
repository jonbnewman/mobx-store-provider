/**
 * Internal Store representation.
 */
export interface Store {
  Context: any;
  useStore: UseStore;
  dispose: DisposeStore;
}

/**
 * Function used to dispose a stores references
 */
export interface DisposeStore {
  (): undefined;
}

/**
 * Function passed to the useStore hook.
 *
 * Specifies a `mapStateToProps` callback which is used to return a subset/slice of the store.
 */
export interface UseStore {
  (mapStateToProps: MapStateToProps): any;
}

/**
 * Function the user passes into the createStore hook.
 *
 * This function should instantiate and return a new instance of a store.
 */
export interface StoreFactory {
  (...args: any[]): any;
}

/**
 * Function used to return a subset/slice of the store
 */
export interface MapStateToProps {
  (store: any): any;
}
