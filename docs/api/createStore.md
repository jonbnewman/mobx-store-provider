---
layout: default
title: createStore
nav_order: 2
parent: API details and examples
---

# createStore

React Hook used to instantiate new **mobx-state-tree** instances inside of [React Function Components](https://www.robinwieruch.de/react-function-component).

It returns the store you instantiate and return from the `factory`.

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

Inside of the `App` we create the `appStore` using the [createStore hook](#createstore).

```javascript
import React from "react";
import { createStore, useProvider } from "mobx-store-provider";
import AppStore from "./AppStore";

function App() {
  // Instantiate appStore inside the App component using createStore
  const appStore = createStore(() => AppStore.create());
  const Provider = useProvider();
  return (
    <Provider value={appStore}>
      {/* ------- The rest of your app ------- */}
    </Provider>
  );
}

export default App;
```

The `Provider` component returned from the [useProvider hook](/api/useProvider) is used to supply the `appStore` to the rest of the application.

## Local state

For local or ephemeral state, it is recommended to define the `store` next to the component it will be used in.

```javascript
import React from "react";
import { observer } from "mobx-react";
import { types } from "mobx-state-tree";
import { createStore } from "mobx-store-provider";

// Define the local store here
const PetStore = types.model({
  name: "Rusty",
  type: "Dog",
});

// Use the store in this component
function PetComponent() {
  const localStore = createStore(() => PetStore.create());
  return (
    <div>
      {localStore.name} is a {localStore.type}
    </div>
  );
}

export default observer(PetComponent);
```

The principal difference between the [local state](#local-state) example and the [basic example](#basic-example) is that the local state example does not use a `Provider` to supply the `store` to the rest of the application.

This avoids the need to use an alternative mechanism for local state, which can create inconsistent code within your application. Having your state managed the same way throughout your application makes it easier to reason about.

With a more complex component (which may have children components itself) you might want to supply its descendants with the store, you can of course do so using the [useProvider hook](/api/useProvider).
