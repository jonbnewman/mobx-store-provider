---
layout: default
title: useStore
nav_order: 7
parent: API details and examples
---

# useStore

React Hook used to retrieve a `store`.

After supplying your application with a store via the [useProvider hook](/api/useProvider) you can then call **useStore** inside of a component to access the `store`.

```javascript
useStore(
  model: IAnyModelType,
  identifier?: any
): Instance<typeof model>
```

## Parameters

- **model** `IAnyModelType`

  The mobx-state-tree model you want to use/retrieve.

- **identifier** _(optional)_ `any`

  A unique identifier that tells **mobx-store-provider** which store you want to get access to.

  See: [When is using an identifier useful?](#when-is-using-an-identifier-useful)

## Examples

- [Basic example](#basic-example)
- [Using an identifier](#using-an-identifer)

This is the `AppStore` model/store used with the examples below:

```javascript
// AppStore.js
import { types } from "mobx-state-tree";

const User = types.model({
  name: "Batman",
  isCoolGuy: true,
});

export default AppStore = types.model({
  user: types.optional(User, {}),
});
```

## Basic example

The following shows a basic example use of **useStore**.

```javascript
// App.jsx
import React from "react";
import { useCreateStore, useProvider } from "mobx-store-provider";
import AppStore from "./AppStore";
import Header from './Header';

function App() {
  const Provider = useProvider(AppStore);
  const appStore = useCreateStore(AppStore);
  return (
    <Provider value={appStore}>
      <Header>
    </Provider>
  )
}

export default App;
```

In the above code, we use the `AppStore` model to both create and provide the store to the application.

```javascript
// Header.jsx (component we access the appStore inside)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";
import AppStore from "./AppStore";

function Header() {
  // We use the store in this component
  const appStore = useStore(AppStore);
  return (
    <div>
      User: {appStore.user.name} {appStore.user.isCoolGuy ? "👍" : "👎"}
    </div>
  );
}

export default observer(Header);
```

Calling the **useStore** hook with the `AppStore` model retrieves the corresponding `AppStore` that was provided via the [useProvider hook](/api/useProvider).

## Using an identifier

If you pass a unique `identifier` then the `store` associated with it is returned (assuming you used the same `identifier` with the `Provider` supplying it, see [useProvider](/api/useProvider)).

```javascript
// App.jsx
import React from "react";
import { useCreateStore, useProvider } from "mobx-store-provider";
import AppStore from "./AppStore";
import Header from './Header';

function App() {
  // Here we use TheAppStore as the identifier
  const Provider = useProvider(AppStore, "TheAppStore");
  const appStore = useCreateStore(AppStore);
  return (
    <Provider value={appStore}>
      <Header>
    </Provider>
  )
}

export default App;
```

In the above code, we use `TheAppStore` as the `identifier` for the store...we will have to use that same `identifier` when we call `useStore` below:

```javascript
// Header.jsx (component we access the appStore inside)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";
import AppStore from "./AppStore";

function Header() {
  // We retrieve the store in this component using the same TheAppStore identifier
  const appStore = useStore(AppStore, "TheAppStore");
  return (
    <div>
      User: {appStore.user.name} {appStore.user.isCoolGuy ? "👍" : "👎"}
    </div>
  );
}

export default observer(Header);
```

## When is using an identifier useful?

When your application needs more than one instance of the same store. In that situation a unique `identifier` must be used to identify which one your application is providing/requesting.

For more information on multiple stores, see: [Multiple stores](/multiple-stores)

[Next: **getStore**](/api/getStore){: .btn .btn-blue }
