---
layout: default
title: createStore
nav_order: 2
parent: API details and examples
---

### createStore

```javascript
createStore(factory): any
```

React Hook used to instantiate new mobx-state-tree instances inside of components. It returns the store you instantiate and return from the `factory`.

**Parameters:**

- _factory_ `() => any`

  Function where you instantiate and return a mobx-state-tree instance.

Example:

```javascript
import React from "react";
import { createStore, useProvider } from "mobx-store-provider";
import AppStore from "./AppStore";

function App() {
  const Provider = useProvider();
  const appStore = createStore(() => AppStore.create());
  return <Provider value={appStore}>...</Provider>;
}

export default App;
```
