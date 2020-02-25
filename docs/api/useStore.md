---
layout: default
title: useStore
nav_order: 3
parent: API details and examples
---

# useStore

React Hook used to retrieve a `store` for a given `identifier`.

This hook is used to access a `store` from within your components. It must be passed the same `identifier` that was used with the `Provider` supplying it.

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

If you have a single or root `store` then this is likely how you will want to access it.

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

A unique `identifier` must be used when your application has more than one `store`.

For more information on multiple stores, see: [Using multiple stores](/using-multiple-stores)

### Using a mapStateToProps callback

With this callback you can return slices of the store with a selector function, or do additional processing before the component accesses it.

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

It is recommended you extract complex/derived values using a view function, as these are cached (see [derived values](https://mobx-state-tree.js.org/concepts/views) in the _mobx-state-tree_ docs).
