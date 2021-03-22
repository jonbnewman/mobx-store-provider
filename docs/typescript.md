---
layout: default
title: Typescript
nav_order: 10
---

# Typescript

The [standard way types are handled in mobx-state-tree](https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time) applications is by explicitly defining your types via extending the `Instance` interface provided by mobx-state-tree.

With **mobx-store-provider** you do not have to do this, your type definitions are inferred for you:

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
