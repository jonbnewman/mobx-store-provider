import React, { useContext } from "react";

function identity(thing: any): any {
  return thing;
}

interface HookProvider {
  Provider: any;
  useStore: Function;
}

export default function StoreProvider(defaultValue = null): HookProvider {
  const StoreContext = React.createContext(defaultValue);
  return {
    Provider: StoreContext.Provider,
    useStore: (mapStateToProps: Function = identity) => {
      const store = useContext(StoreContext);
      return mapStateToProps(store);
    },
  };
}
