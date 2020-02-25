---
layout: default
title: createStore
nav_order: 2
parent: API details and examples
---

# createStore

React Hook used to instantiate new mobx-state-tree instances inside of components. It returns the store you instantiate and return from the `factory`.

```javascript
createStore(factory): any
```

## Parameters

- _factory_ `() => any`

  Function where you instantiate and return a mobx-state-tree instance.

## Examples

- [Basic example](#basic-example)
- [Local component state](#local-state)

### Basic example

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

Using this hook you can instantiate/create _mobx-state-tree_ models/stores inside of any component.

### Local state

Using an alternative mechanism for local state creates inconsistent code within your application. This is less than ideal.

Using _mobx-store-provider_, ad-hoc/local state is a snap.

You can just define the model in the same `createStore` callback that instantiates it:

```javascript
import React from "react";
import { observer } from "mobx-react";
import { types } from "mobx-state-tree";
import { createStore } from "mobx-store-provider";

function PetComponent() {
  const localStore = createStore(() =>
    types
      .model({
        name: "Rusty",
        type: "Dog",
      })
      .create(),
  );

  return (
    <div>
      {localStore.name} is a {localStore.type}
    </div>
  );
}

export default observer(PetComponent);
```
