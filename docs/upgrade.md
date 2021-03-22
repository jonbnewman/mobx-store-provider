---
layout: default
title: Upgrading 1.x -> 2.x
nav_order: 13
---

# Upgrading from 1.x to 2.x

The biggest change to v2.x of **mobx-store-provider** is the addition of automatic type inference.

**What does that mean?**

In previous (pre 2.x) versions of **mobx-store-provider** you would have to explicitely define the interface for your stores/models in order to take advantage of typescript during development (type hinting, validation, etc). This is [the standard way it is handled in mobx-state-tree](https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time) applications.

As of version 2.0 of **mobx-store-provider** your type definitions are correctly inferred for you.

To explain the API changes from 1.x to 2.x, please see the following examples:

## Old v1.x API

```javascript
import { types, Instance } from "mobx-state-tree";
import AppStore from "./AppStore";

export const AppStore = types.model({
  user: types.optional(types.string, ""),
});

// First we have to explicitly define the interface for AppStore
interface IAppStore extends Instance<typeof AppStore> {}

function UserDisplay() {
  /**
   * Then we have to explicitly tell typescript what type of object this is
   * using the previously extended interface we created for this store.
   */
  const appStore: IAppStore = useStore();
  /**
   * The following will not compile, it will cause a typescript error
   * because `foobar` is not a property of an `AppStore`
   */
  return <div>{appStore.foobar}</div>;
}
```

## New v2.x API

When using v2.x of **mobx-store-provider** and later, the type is correctly extended and inferred for you whenever you call [useCreateStore](/api/useCreateStore) or [useStore](/api/useStore):

```javascript
import { types } from "mobx-state-tree";
import AppStore from "./AppStore";

const AppStore = types.model({
  user: types.optional(types.string, ""),
});

function UserDisplay() {
  /**
   * We give the store definition to useStore.
   * Using that, mobx-store-provider correctly infers the type for us.
   */
  const appStore = useStore(AppStore);
  /**
   * The following will not compile, it will cause a typescript error
   * because `foobar` is not a property of an `AppStore`
   */
  return <div>{appStore.foobar}</div>;
}
```

The major API difference in version >=2.x is that you provide the store definition to both [useCreateStore](/api/useCreateStore) and [useStore](/api/useStore). This makes it unnecessary to explicitly define the interface for the model as it is inferred for you, making your code more concise and easier to maintain.

[Back to **Introduction**](/){: .btn .btn-blue }
