---
layout: default
title: useProvider
nav_order: 1
parent: API details and examples
---

### useProvider

```javascript
useProvider(): Provider
useProvider(identifier): Provider
```

React Hook used to retrieve the `Provider` for a given `identifier`. This is a wrapper component you can use to provide your application with the store.

**Parameters:**

- _identifier_ `string | number | object | symbol | null | Array<any>` _(optional)_

  A unique identifier that tells _mobx-store-provider_ which store you want the Provider for.

Example:

```javascript
import React from "react";
import { useProvider } from "mobx-store-provider";
import AppStore from "./AppStore";
const appStore = AppStore.create();

function App() {
  const Provider = useProvider();
  return (
    <Provider value={appStore}>
      <MyComponents />
    </Provider>
  );
}

export default App;
```
