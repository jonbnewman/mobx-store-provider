---
layout: default
title: useStore
nav_order: 3
parent: API details and examples
---

# useStore

React Hook used to retrieve a `store` for a given `identifier`.

After supplying your application with a store via the [useProvider hook](/api/useProvider) you can then call **useStore** inside of a component to access the `store`.

It must be passed the same `identifier` that was used with the `Provider` supplying it.

```javascript
useStore(): any
useStore(identifier): any
useStore(mapStateToProps): any
useStore(identifier, mapStateToProps): any
```

## Parameters

- **identifier** _(optional)_ `string | number | object | symbol | null | Array<any>`

  A unique identifier that tells _mobx-store-provider_ which store you want to get access to.

- **mapStateToProps** _(optional)_ `(store: any) => any`

  Function that can be used to select and return slices of the store.

## Examples

- [Basic example](#basic-example)
- [Using an identifier](#use-an-identifer)
- [Using a mapStateToProps callback](#using-a-mapstatetoprops-callback)

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

Calling the **useStore** hook retrieves the corresponding `store` that was provided via the [useProvider hook](/api/useProvider).

## Using an identifier

If you pass a unique `identifier` then the `store` associated with it is returned (assuming you used the same `identifier` with the `Provider` supplying it, see [useProvider](/api/useProvider)).

```javascript
// Header.jsx (component we access the appStore inside)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

function Header() {
  // We use the store in this component with a unique identifier
  const appStore = useStore("AppStore");
  return (
    <div>
      User: {appStore.user.name} {appStore.user.isCoolGuy ? "👍" : "👎"}
    </div>
  );
}

export default observer(Header);
```

A unique `identifier` must be used when your application has more than one `store`.

For more information on multiple stores, see: [Using multiple stores](/using-multiple-stores)

## Using a mapStateToProps callback

With this callback you can return slices of the store with a selector function or do additional processing before the component accesses it.

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

It is recommended you derive complex values using a view function, as these are cached (see [derived values](https://mobx-state-tree.js.org/concepts/views) in the **mobx-state-tree** docs).

[Next: Multiple stores](/multiple-stores){: .btn .btn-blue }
