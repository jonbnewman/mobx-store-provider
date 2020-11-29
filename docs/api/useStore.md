---
layout: default
title: useStore
nav_order: 6
parent: API details and examples
---

# useStore

React Hook used to retrieve a `store` for a given `identifier`.

After supplying your application with a store via the [useProvider hook](/api/useProvider) you can then call **useStore** inside of a component to access the `store`.

It must be passed the same `identifier` that was used with the `Provider` supplying it (if one was supplied).

```javascript
useStore(model: IAnyModelType, identifier?: any): Instance<typeof model>
```

## Parameters

- **model** `IAnyModelType`

  The mobx-state-tree model you want to use/retrieve.

- **identifier** _(optional)_ `any`

  A unique identifier that tells **mobx-store-provider** which store you want to get access to.

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

The following shows an example of calling **useStore** without any parameters.

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

Calling the **useStore** hook retrieves the corresponding `store` that was provided via the [useProvider hook](/api/useProvider).

## Using an identifier

If you pass a unique `identifier` then the `store` associated with it is returned (assuming you used the same `identifier` with the `Provider` supplying it, see [useProvider](/api/useProvider)).

```javascript
// Header.jsx (component we access the appStore inside)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";
import AppStore from "./AppStore";

function Header() {
  // We use the store in this component with a unique identifier
  const appStore = useStore(AppStore, "TheAppStore");
  return (
    <div>
      User: {appStore.user.name} {appStore.user.isCoolGuy ? "👍" : "👎"}
    </div>
  );
}

export default observer(Header);
```

A unique `identifier` must be used when your application has more than one of the same `store`.

For more information on multiple stores, see: [Using multiple stores](/using-multiple-stores)

[Next: **Multiple stores**](/multiple-stores){: .btn .btn-blue }
