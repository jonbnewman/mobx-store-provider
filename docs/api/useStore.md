---
layout: default
title: useStore
nav_order: 3
parent: API details and examples
---

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
