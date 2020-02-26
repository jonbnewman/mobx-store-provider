---
layout: default
title: createStore
nav_order: 2
parent: API details and examples
---

# createStore

React Hook used to instantiate new **mobx-state-tree** models inside of [React Function Components](https://www.robinwieruch.de/react-function-component).

It returns the `store` you instantiate and return from the `factory`.

```javascript
createStore(factory): any
```

## Parameters

- **factory** `() => any`

  Function where you instantiate and return a mobx-state-tree instance.

## Examples

- [Basic example](#basic-example)
- [Local state](#local-state)

## Basic example

Define our `AppStore` **mobx-state-tree** store/model.

```javascript
// AppStore.js (mobx-state-tree model)
import { types } from "mobx-state-tree";
const AppStore = types.model({
  user: types.maybe(types.string),
});
```

Inside of the `App` we create the `appStore` using the **createStore** hook.

```javascript
import React from "react";
import { createStore, useProvider } from "mobx-store-provider";
import AppStore from "./AppStore";

function App() {
  // Instantiate appStore inside the App component using createStore
  const appStore = createStore(() => AppStore.create());

  // Retrieve the Provider for the appStore
  const Provider = useProvider();

  return (
    <Provider value={appStore}>
      {/* ------- The rest of your app ------- */}
    </Provider>
  );
}

export default App;
```

Note that in this example we also use the `Provider` component returned from the [useProvider hook](/api/useProvider) to supply the `appStore` to the rest of the application.
