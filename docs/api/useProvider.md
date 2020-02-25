---
layout: default
title: useProvider
nav_order: 1
parent: API details and examples
---

# useProvider

React Hook used to retrieve the `Provider` for a given `identifier`. This is a wrapper component you can use to provide your application with the store.

```javascript
useProvider(): Provider
useProvider(identifier): Provider
```

## Parameters

- _identifier_ `string | number | object | symbol | null | Array<any>` _(optional)_

  A unique identifier that tells _mobx-store-provider_ which store you want the Provider for.

## Example

If your application has a single/root `store` then you can call `useProvider` without any options (a unique `identifier` will be supplied for you).

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

Below is a basic _mobx-state-tree_ model/store:

```javascript
// AppStore.js
import { types } from "mobx-state-tree";

export default types.model({
  username: "",
});
```

Using or getting access to the `store` in other components is accomplished with the [useStore](/api/useStore) hook.

## Using an identifier

You can also use a unique `identifier` to tell _mobx-store-provider_ which `store` you want the `Provider` for.

```javascript
// App.jsx
import React from "react";
import { useProvider } from "mobx-store-provider";
import { appStoreId, AppStore } from "./AppStore";

const appStore = AppStore.create();

function App() {
  const AppProvider = useProvider(appStoreId);
  return (
    <AppProvider value={appStore}>
      <MyComponents />
    </AppProvider>
  );
}

export default App;
```

In the code above, we pass `appStoreId` to `useProvider`. This makes the `Provider` that is returned work for that `identifier`.

To use/access this `store` in another component you will need to supply the [useStore](/api/useStore) hook with that same `identifier`.

```javascript
// AppStore.js
import { types } from "mobx-state-tree";

const appStoreId = "AppStore";
const AppStore = types.model({
  username: "",
});

export { appStoreId, AppStore };
```
