---
layout: default
title: Typescript
nav_order: 7
---

# Typescript'

Interfaces and type definitions for the **mobx-store-provider** API are provied by the library.

Beyond that, typescript definitions are [supplied by mobx-state-tree](https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time) for your stores/models.

The one thing of note with respect to typescript and **mobx-store-provider** is that when you use the [createStore hook](/api/createStore) or the [useStore hook](/api/useStore) typescript needs to be informed what type is being returned.

This is because the values returned from these hooks are dynamic and decided at runtime. Typescript is unable to infer them.

To specify this you must first define an `interface` for your `store`:

```javascript
/// AppStore.ts (mobx-state-tree store/model)
import { types, Instance } from "mobx-state-tree";

// Define and export the AppStore
export const AppStore = types.model({
  user: types.optional(types.string, ""),
});

// Define and export the interface to represent an AppStore
export interface IAppStore extends Instance<typeof AppStore> {}
```

Then, in your component when calling the [createStore hook](/api/createStore) you must inform typescript what type is being returned by using that stores associated `interface` you defined for it:

```javascript
// App.tsx
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import { AppStore, IAppStore } from "./AppStore";

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

Likewise, the same thing must also be done when using the [useStore hook](/api/useStore) in your components as well:

```javascript
// UserDisplay.tsx
import React from "react";
import { useStore } from "mobx-store-provider";
import { IAppStore } from "./AppStore";

function UserDisplay() {
  // With this declaration, typescript knows the appStore is an AppStore
  const appStore: IAppStore = useStore();

  /**
   * The following will not compile, it will cause a typescript error
   * because `foobar` is not a property of an `AppStore`
   */
  return <div>{appStore.foober}</div>;
}
```

By telling typescript what type of model/store you are using you are able to retain the [type information provided by mobx-state-tree](https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time).

[Next: **Testing**](/testing){: .btn .btn-blue }
