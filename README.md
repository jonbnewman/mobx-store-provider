# mobx-store-provider

Use React Hooks with [mobx-state-tree](http://mobx-state-tree.js.org/).

> An easy to use, straight-forward API for using mobx-state-tree with functional React components.

## Install

```bash
# via NPM
npm install mobx-store-provider --save
```

```bash
# via Yarn
yarn add mobx-store-provider
```

### Example

```javascript
// App.js (Main App component, we use it to create and provide the store)
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import AppStore from "./AppStore";
import MyNameDisplay from "./MyNameDisplay";

function App() {
  const Provider = useProvider();
  const appStore = createStore(() => AppStore.create({ user: "Jonathan" }));
  return (
    <Provider value={appStore}>
      <UserDisplay />
    </Provider>
  );
}

export default App;
```

```javascript
// UserDisplay.js (Your component, we use the store inside)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

function UserDisplay() {
  const appStore = useStore();
  return <div>{appStore.user}</div>;
}

export default observer(UserDisplay);
```

```javascript
// AppStore.js (mobx-state-tree store/model)
import { types } from "mobx-state-tree";

const AppStore = types.model({
  user: types.string,
});

export default AppStore;
```

## API Details and Examples

- `useProvider(storeIdentifier: any = null): Provider`

  React Hook which you can use to create and/or retrieve the React `Context.Provider` for a given `storeIdentifier`.

  This is the wrapper component you can use to provide your application with the store.

  ```javascript
  import { useProvider } from "mobx-store-provider";
  import AppStore from "./AppStore";
  const appStore = AppStore.create();

  export default function App() {
    const Provider = useProvider();
    return (
      <Provider value={appStore}>
        <MyApplication />
      </Provider>
    );
  }
  ```

- `createStore(StoreFactory: Function): any`

  React Hook which you can use to instantiate new mobx-state-tree instances inside of components.

  It takes a factory `Function` as its input, you should instantiate and return a mobx-state-tree instance within that function.

  ```javascript
  import { createStore, useProvider } from "mobx-store-provider";
  import AppStore from "./AppStore";

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
  // App.js (Main App component, we use it to create and provide the store)
  import { useProvider, createStore } from "mobx-store-provider";
  import Header from "./Header";
  import AppStore from "./AppStore";

  // Export our appStore identifier so other components can use it to pull in the store.
  export const appStore = "app-store";

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
  // Header.js (Your component, we use the store inside)
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

  export default observer(Header);
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
