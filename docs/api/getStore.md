---
layout: default
title: getStore
nav_order: 6
parent: API details and examples
---

# getStore

Method to retrieve a `store` from outside a component.

After supplying your application with a store via the [useProvider hook](/api/useProvider) you can then call **getStore** outside of a component to access the `store`.

```javascript
getStore(
  model: IAnyModelType,
  identifier?: any
): Instance<typeof model>
```

This method mirrors [useStore](/api/useStore) with the only difference being that it can be called from outside of a React component. This is useful from within callbacks or other places where access to a `store` is needed outside of a component.

## Parameters

- **model** `IAnyModelType`

  The mobx-state-tree model you want to use/retrieve.

- **identifier** _(optional)_ `any`

  A unique identifier that tells **mobx-store-provider** which store you want to get access to.

## Examples

- [Basic example](#basic-example)
- [Using an identifier](#using-an-identifer)

## Basic example

The following shows a basic example use of **getStore**:

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
      <WhoAmI>
    </Provider>
  )
}

export default App;
```

In the above code, we use the `AppStore` model to both create and provide the store to the application.

```javascript
// WhoAmI.jsx (component we access the appStore inside)
import React from "react";
import { observer } from "mobx-react";
import { getStore } from "mobx-store-provider";
import AppStore from "./AppStore";

function getName() {
  // We use the store in this function
  const appStore = getStore(AppStore);
  alert(appStore.user.name);
}

function WhoAmI() {
  return <Button onClick={getName}>Who am I?</Button>;
}

export default observer(WhoAmI);
```

Calling the **getStore** method with the `AppStore` model retrieves the corresponding `AppStore` that was provided via the [useProvider hook](/api/useProvider).

This is the `AppStore` model/store used with the example above:

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

[Next: **Multiple stores**](/multiple-stores){: .btn .btn-blue }
