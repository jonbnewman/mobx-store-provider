---
layout: default
title: Typescript
nav_order: 6
---

# Typescript

Using _mobx-store-provider_ and [retaining the strong typing provided by _mobx-state-tree_](https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time) is simple.

```javascript
/// AppStore.ts (mobx-state-tree store/model)
import { types, Instance } from "mobx-state-tree";

const AppStore = types.model({
  user: types.optional(types.string, ""),
});

// Create an interface to represent an instance of the AppStore
interface IAppStore extends Instance<typeof AppStore> {}

export { AppStore, IAppStore };
```

It is important to note that when using [createStore](/api/createStore) or [useStore](/api/useStore) typescript needs to be informed what type is being returned.

Since it is decided at runtime, you must specify this explicitly.

```javascript
// App.tsx
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import { AppStore, IAppStore } from "./AppStore";

function UserDisplay() {
  // With this declaration, typescript knows the appStore is an AppStore
  const appStore: IAppStore = useStore();
  return <div>{appStore.user}</div>;
}

function App() {
  const Provider = useProvider();

  // With this declaration, typescript knows the appStore is an AppStore
  const appStore: IAppStore = createStore(() => AppStore.create());

  /**
   * The following will not compile, it will cause a typescript error
   * because `foobar` is not a property of an `AppStore`
   */
  console.info(appStore.foobar);

  return (
    <Provider value={appStore}>
      <UserDisplay />
    </Provider>
  );
}

export default App;
```
