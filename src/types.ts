export interface Store {
  Context: any;
  useStore: UseStore;
  dispose: Function;
}

export interface UseStore {
  (mapStateToProps: MapStateToProps): any;
}

export interface StoreFactory {
  (...args: any[]): any;
}

export interface MapStateToProps {
  (thing: any): any;
}
