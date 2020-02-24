---
layout: default
title: API details and examples
nav_order: 3
---

## API details and examples

- [useProvider](#useprovider) - Provide your components with a store
- [createStore](#createstore) - Create a new store inside a component
- [useStore](#usestore) - Use a store in a component

### useProvider

```javascript
useProvider(): Provider
useProvider(identifier): Provider
```

React Hook used to retrieve the `Provider` for a given `identifier`. This is a wrapper component you can use to provide your application with the store.

**Parameters:**

- _identifier_ `string | number | object | symbol | null | Array<any>` _(optional)_

  A unique identifier that tells _mobx-store-provider_ which store you want the Provider for.

Example:

```javascript
import React from "react";
import { useProvider } from "mobx-store-provider";
import AppStore from "./AppStore";
const appStore = AppStore.create();

function App() {
  const Provider = useProvider();
  return (
    <Provider value={appStore}>
      <MyComponents />
    </Provider>
  );
}

export default App;
```

### createStore

```javascript
createStore(factory): any
```

React Hook used to instantiate new mobx-state-tree instances inside of components. It returns the store you instantiate and return from the `factory`.

**Parameters:**

- _factory_ `() => any`

  Function where you instantiate and return a mobx-state-tree instance.

Example:

```javascript
import React from "react";
import { createStore, useProvider } from "mobx-store-provider";
import AppStore from "./AppStore";

function App() {
  const Provider = useProvider();
  const appStore = createStore(() => AppStore.create());
  return <Provider value={appStore}>...</Provider>;
}

export default App;
```

### useStore

```javascript
useStore(): any
useStore(identifier): any
useStore(mapStateToProps): any
useStore(identifier, mapStateToProps): any
```

React Hook used to retrieve a `store` for a given `identifier`.

**Parameters:**

- _identifier_ `string | number | object | symbol | null | Array<any>` _(optional)_

  A unique identifier that tells _mobx-store-provider_ which store you want to get access to.

- _mapStateToProps_ `(store: any) => any` _(optional)_

  Function that can be used to select and return slices of the store.

Example:

```javascript
// App.jsx (Main App component, we use it to create and provide the store)
import React from "react";
import { types } from "mobx-state-tree";
import { useProvider, createStore } from "mobx-store-provider";
import Header from "./Header";

const User = types.model({
  name: "Batman",
  isCoolGuy: true,
});

const AppStore = types.model({
  user: types.optional(User, {}),
});

function App() {
  const Provider = useProvider();
  const appStore = createStore(() => AppStore.create());
  return (
    <Provider value={appStore}>
      <Header />
    </Provider>
  );
}

export default App;
```

```javascript
// Header.jsx (A component, we use the store inside)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

function selectUserName(store) {
  return store.user.name;
}

function selectCoolStatus(store) {
  return store.user.isCoolGuy;
}

function Header() {
  // We use the store in this component
  const { name, isCoolGuy } = useStore(store => ({
    name: selectUserName(store),
    isCoolGuy: selectCoolStatus(store),
  }));

  return (
    <div>
      User: {name} {isCoolGuy ? "👍" : "👎"}
    </div>
  );
}

export default observer(Header);
```
