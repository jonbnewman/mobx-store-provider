---
layout: default
title: Typescript
nav_order: 6
---

# Typescript

When using [createStore](/api/createStore) or [useStore](/api/useStore) typescript needs to be informed what type is being returned.

To do this you must first define an `interface` for the `store`.

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

In your components you can tell typescript what type a `store` is by using that `interface`.

```javascript
// App.tsx
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import { AppStore, IAppStore } from "./AppStore";

function UserDisplay() {
  // With this declaration, typescript knows the appStore is an AppStore
  const appStore: IAppStore = useStore();

  /**
   * The following will not compile, it will cause a typescript error
   * because `foobar` is not a property of an `AppStore`
   */
  return <div>{appStore.foober}</div>;
}

function App() {
  const Provider = useProvider();

  // With this declaration, typescript knows the appStore is an AppStore
  const appStore: IAppStore = createStore(() => AppStore.create());

  return (
    <Provider value={appStore}>
      <UserDisplay />
    </Provider>
  );
}

export default App;
```
