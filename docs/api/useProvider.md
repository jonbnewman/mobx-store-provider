---
layout: default
title: useProvider
nav_order: 1
parent: API details and examples
---

# useProvider

React Hook used to retrieve the `Provider` for a given `identifier`.

This hook returns a wrapper component you can use to provide your application with the `store`.

```javascript
useProvider(): Provider
useProvider(identifier): Provider
```

## Parameters

- _identifier_ `string | number | object | symbol | null | Array<any>` _(optional)_

  A unique identifier that tells _mobx-store-provider_ which store you want the Provider for.

## Examples

- [Basic example](#basic-example)
- [Using an identifier](#using-an-identifier)

### Basic example

For single or root `store` use-cases, you can call `useProvider` without any options.

A unique `identifier` will be supplied for you.

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

```javascript
// AppStore.js
import { types } from "mobx-state-tree";

const AppStore = types.model({
  username: "",
});

export default AppStore;
```

Getting access to the `store` in other components is accomplished with the [useStore](/api/useStore) hook.

### Using an identifier

You can also use a unique `identifier` to tell _mobx-store-provider_ which `store` you want the `Provider` for.

```javascript
// App.jsx
import React from "react";
import { useProvider } from "mobx-store-provider";

// Import both the store and the id
import { appStoreId, AppStore } from "./AppStore";

const appStore = AppStore.create();

function App() {
  // use the id when getting the Provider
  const AppProvider = useProvider(appStoreId);
  return (
    <AppProvider value={appStore}>
      <MyComponents />
    </AppProvider>
  );
}

export default App;
```

In the code above, we pass `appStoreId` to `useProvider`.

The `Provider` returned will work for that `identifier`.

```javascript
// AppStore.js
import { types } from "mobx-state-tree";

const appStoreId = "AppStore";
const AppStore = types.model({
  username: "",
});

// Export both the identifier and the model/store
export { appStoreId, AppStore };
```

It is important to note, that in order to access this `store` in another component you will need to supply the [useStore](/api/useStore) hook with that same `identifier`.
