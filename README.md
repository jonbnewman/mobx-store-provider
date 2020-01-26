# mobx-store-provider

Use React Hooks with mobx-state-tree.

## Install

```bash
# via NPM
npm install mobx-store-provider --save
```

```bash
# via Yarn
yarn add mobx-store-provider
```

## Intro

Using Hooks with mobx-state-tree requires a bit of glue logic, this library provides that.

mobx-store-provider supplies utilities for creating and supplying your React components with a mobx-state-tree store, so they can bind to and trigger actions on it.

### Example

```javascript
// App.js
import React from "react";
import { types } from "mobx-state-tree";
import { useProvider, createStore } from "mobx-store-provider";
import MyNameDisplay from "./MyNameDisplay";

const AppStore = types.model({
  name: types.string,
});

function App() {
  const Provider = useProvider();
  const appStore = createStore(() => AppStore.create({ name: "Jonathan" }));
  return (
    <Provider value={appStore}>
      <MyNameDisplay />
    </Provider>
  );
}

export default App;
```

```javascript
// MyNameDisplay.js
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

function MyNameDisplay() {
  const appStore = useStore();
  return <div>{appStore.name}</div>;
}

export default observer(MyNameDisplay);
```

## API Details and Examples

- `useProvider(storeIdentifier: any = null): Provider`

  React Hook which you can use to create and/or retrieve the React `Context.Provider` for a given `storeIdentifier`.

  This is the wrapper component you can use to provide your application with the store.

  ```javascript
  import { useProvider } from "mobx-store-provider";
  const myStore = MyStore.create();

  export default function App() {
    const Provider = useProvider();
    return (
      <Provider value={myStore}>
        <MyOtherComponent />
      </Provider>
    );
  }
  ```

- `createStore(StoreFactory: Function): any`

  React Hook which you can use to instantiate new mobx-state-tree instances inside of components.

  It takes a factory `Function` as its input, you should instantiate and return a mobx-state-tree instance within that function.

  ```javascript
  import { types } from "mobx-state-tree";
  import { createStore, useProvider } from "mobx-store-provider";

  const AppStore = types.model({
    user: "Jonathan",
  });

  export default function App() {
    const Provider = useProvider();
    const appStore = createStore(() => AppStore.create());
    return <Provider value={appStore}>...</Provider>;
  }
  ```

- `useStore(storeIdentifier: any = null, mapStateToProps: Function = identity): any`

  React Hook which you can use in your other components to retrieve and use a `store` for a given `storeIdentifier`.

  The `storeIdentifier` simply tells mobx-store-provider which store you want to get access to. It is optional, the default identifier is `null`.

  You can optionally pass it a `mapStateToProps` function which you can use to select and return specific slices of the store into your components with.

  In the absense of a `mapStateToProps` callback, it will return the store instance.

  ```javascript
  // App.js
  import { types } from "mobx-state-tree";
  import { useProvider, createStore } from "mobx-store-provider";
  import Header from "./Header";

  // Export our appStore identifier so other components can use it to
  // pull in the correct store.
  export const appStore = "app-store";

  const AppStore = types.model({
    user: "Jonathan",
  });

  export default function App() {
    const Provider = useProvider(appStore);
    return (
      <Provider value={createStore(() => AppStore.create())}>
        <Header />
      </Provider>
    );
  }
  ```

  ```javascript
  // Header.js
  import { observer } from "mobx-react";
  import { useStore } from "mobx-store-provider";
  import { appStore } from "./App";

  function selectUser(store) {
    return store.user;
  }

  function Header() {
    const user = useStore(appStore, selectUser);
    return <div>User: {user}</div>;
  }

  export default observer(House);
  ```

* `disposeStore(storeIdentifier: any = null): undefined`

  Cleanup, if your app doesn't need the store and Provider anymore.

  You might encounter this scenario if you created a store for a specific component (ie: not a long-lived root store/etc), and that component is removed.

  In that case you need to call `disposeStore(storeIdentifier)` so that the store can be fully released and garbage collected.

  ```javascript
  import React, { useEffect } from "react";
  import { types } from "mobx-state-tree";
  import { useProvider, createStore, disposeStore } from "mobx-store-provider";

  const MyPetAnimal = types.model({
    name: types.optional(types.string, "Barney"),
    type: types.optional(types.enumeration("type", ["Cat", "Dog", "Orangutan"]), "Dog"),
  });

  export default function MyPet() {
    useEffect(() => disposeStore("my-app"), []);
    const Provider = useProvider("my-app");
    const myPet = createStore(() => MyPetAnimal.create());
    return (
      <Provider value={myPet}>
        <div>...</div>
      </Provider>
    );
  }
  ```
