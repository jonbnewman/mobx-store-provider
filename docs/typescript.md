---
layout: default
title: Typescript
nav_order: 9
---

# Typescript

The biggest change to v2.x of **mobx-store-provider** is the addition of automatic type inferrence.

**What does that mean?**

In previous (pre 2.x) versions of **mobx-store-provider** you would have to explicitely define the interface for your stores/models in order to take advantage of typescript during development (type hinting, validation, etc).

The [standard way it is handled in mobx-state-tree](https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time) applications is by explicitly defining your types via extending the Instance interface provided by mobx-state-tree.

With **mobx-store-provider** your type definitions are inferred for you:

```javascript
import { types } from "mobx-state-tree";

// Define the AppStore
const AppStore = types.model({
  user: types.optional(types.string, ""),
});

// This is a component which uses the AppStore
function UserDisplay() {
  // With this declaration, mobx-store-provider correctly infers the type for AppStore
  const appStore = useStore(AppStore);

  /**
   * The following will not compile, it will cause a typescript error
   * because `foobar` is not a property of an `AppStore`
   */
  return <div>{appStore.foobar}</div>;
}
```

[Next: **Testing**](/testing){: .btn .btn-blue }
