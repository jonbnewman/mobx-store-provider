---
layout: default
title: useStore
nav_order: 3
parent: API details and examples
---

# useStore

React Hook used to retrieve a `store` for a given `identifier`.

```javascript
useStore(): any
useStore(identifier): any
useStore(mapStateToProps): any
useStore(identifier, mapStateToProps): any
```

## Parameters

- _identifier_ `string | number | object | symbol | null | Array<any>` _(optional)_

  A unique identifier that tells _mobx-store-provider_ which store you want to get access to.

- _mapStateToProps_ `(store: any) => any` _(optional)_

  Function that can be used to select and return slices of the store.

## Examples

- [Basic example](#basic-example)
- [Using an identifier](#use-an-identifer)
- [Using a mapStateToProps callback](#using-a-mapstatetoprops-callback)

First, here is the `AppStore` model/store and main `App` component used with the examples below:

```javascript
// AppStore.js
import { types } from "mobx-state-tree";

const User = types.model({
  name: "Batman",
  isCoolGuy: true,
});

const AppStore = types.model({
  user: types.optional(User, {}),
});

export default AppStore;
```

and the main `App` component using the `Provider` to supply the application with the `AppStore`:

```javascript
// App.jsx (App component used to create and provide the store)
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import Header from "./Header";
import AppStore from "./AppStore";

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

### Basic example

The following shows an example of calling `useStore` without any parameters.

The unique `identifier` is supplied for you.

```javascript
// Header.jsx (component we access the appStore inside)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

function Header() {
  // We use the store in this component
  const appStore = useStore();
  return (
    <div>
      User: {appStore.user.name} {appStore.user.isCoolGuy ? "👍" : "👎"}
    </div>
  );
}

export default observer(Header);
```

### Using an identifier

By passing a unique `identifier`, the `store` associated with it is returned (assuming you used the same `identifier` with the `Provider` supplying it).

```javascript
// Header.jsx (component we access the appStore inside)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

function Header() {
  // We use the store in this component
  const appStore = useStore("storeIdentifier");
  return (
    <div>
      User: {appStore.user.name} {appStore.user.isCoolGuy ? "👍" : "👎"}
    </div>
  );
}

export default observer(Header);
```

### Using a mapStateToProps callback

Using the `mapStateToProps` callback, you can return slices of the store with a selector function or do additional processing before the component accesses it.

```javascript
// Header.jsx (component we access the appStore inside)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

// Selector functions
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

Note that it is recommended you extract complex/derived values using a view function as these are cached, see [derived values](https://mobx-state-tree.js.org/concepts/views) in the _mobx-state-tree_ docs.
