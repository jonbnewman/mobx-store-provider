---
layout: default
title: useProvider
nav_order: 1
parent: API details and examples
---

# useProvider

React Hook used to retrieve the `Provider` for a given store `identifier`.

This hook returns a wrapper component you can use to provide your application with a `store`.

```javascript
useProvider(): Provider
useProvider(identifier): Provider
```

## Parameters

- **identifier** _(optional)_ `string | number | object | symbol | null | Array<any>`

  A unique identifier that tells _mobx-store-provider_ which store you want the Provider for.

## Examples

- [Basic example](#basic-example)
- [Using an identifier](#using-an-identifier)

This is the `AppStore` model/store used with the examples below:

```javascript
// AppStore.js
import { types } from "mobx-state-tree";

const appStoreId = "AppStore";
const AppStore = types.model({
  user: types.maybe(types.string),
});

export { AppStore, appStoreId };
```

## Basic example

For single or root `store` use-cases you can call `useProvider` without any options.

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

This supplies the `appStore` to its descendants and allows us to access it using the [useStore hook](/api/useStore#using-an-identifier) in an inner component.

## Using an identifier

You can also use a unique `identifier` to tell **mobx-store-provider** which `store` you want the `Provider` for.

```javascript
// App.jsx
import React from "react";
import { useProvider } from "mobx-store-provider";

// Import both the store and the id
import { appStoreId, AppStore } from "./AppStore";

const appStore = AppStore.create();

function App() {
  // use the id when getting the Provider
  const Provider = useProvider(appStoreId);
  return (
    <Provider value={appStore}>
      <MyComponents />
    </Provider>
  );
}

export default App;
```

In the code above, we pass `appStoreId` to the [useProvider hook](#useprovider), the `Provider` component it returns will work for that particular `identifier` (`appStoreId`).

We can then wrap our application with that `Provider` and pass it the `appStore` as its value. This supplies the `appStore` to its descendants allowing us to access it using that same unique `identifier` passed to the [useStore hook](/api/useStore#using-an-identifier) in an inner component.
