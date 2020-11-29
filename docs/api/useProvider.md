---
layout: default
title: useProvider
nav_order: 4
parent: API details and examples
---

# useProvider

React Hook used to retrieve the `Provider` for a given store `identifier`.

This hook returns a wrapper component you can use to provide your application with a `store`.

```javascript
useProvider(model: IAnyModelType, identifier?: any): Provider
```

## Parameters

- **model** `IAnyModelType`

  The mobx-state-tree model you want to provide.

- **identifier** _(optional)_ `any`

  A unique identifier that tells **mobx-store-provider** which store you want the Provider for.

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

We call the **useProvider** hook to retrieve a `Provider` component. This lets us share the `appStore` with the rest of the application.

```javascript
import React from "react";
import { useProvider } from "mobx-store-provider";

// Import the AppStore and create it
import AppStore from "./AppStore";
const appStore = AppStore.create();

function App() {
  // Get the Provider via the useProvider hook
  const Provider = useProvider(AppStore);

  // Wrap the application with the Provider, passing the appStore as a value
  return (
    <Provider value={appStore}>
      <MyComponents />
    </Provider>
  );
}

export default App;
```

This supplies the `appStore` to its descendants, allowing us to access it using the [useStore hook](/api/useStore) in an inner component.

Note that since we didn't create the `appStore` inside of the component we did not use the [useCreateStore hook](/api/useCreateStore) (that is only necessary when instantiating a `store` from within a [React Function Component](https://www.robinwieruch.de/react-function-component)).

## Using an identifier

You can also use a unique `identifier` to tell **mobx-store-provider** which `store` you want the `Provider` for.

This is necessary when you have more than one `store` in an application.

```javascript
// App.jsx
import React from "react";
import { useProvider } from "mobx-store-provider";

// Import both the store and the id
import { AppStore, appStoreId } from "./AppStore";

const appStore = AppStore.create();

function App() {
  // use the id when getting the Provider
  const Provider = useProvider(AppStore, appStoreId);
  return (
    <Provider value={appStore}>
      <MyComponents />
    </Provider>
  );
}

export default App;
```

In the code above, we pass `appStoreId` to the **useProvider** hook, the `Provider` component it returns will work for that particular `identifier` (`appStoreId`).

We can then wrap our application with that `Provider` and pass it the `appStore` as its value. This supplies the `appStore` to its descendants allowing us to access it using that unique `identifier` passed to the [useStore hook](/api/useStore) in an inner component.

## When is using an identifier useful?

When your application needs more than one instance of the same store. In that situation a unique `identifier` must be used to identify which one your application is providing/requesting.

For more information on multiple stores, see: [Using multiple stores](/multiple-stores)

[Next: **useCreateStore**](/api/useCreateStore){: .btn .btn-blue }
