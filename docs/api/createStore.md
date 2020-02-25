---
layout: default
title: createStore
nav_order: 2
parent: API details and examples
---

# createStore

React Hook used to instantiate new mobx-state-tree instances inside of components.

It returns the store you instantiate and return from the `factory`.

```javascript
createStore(factory): any
```

## Parameters

- _factory_ `() => any`

  Function where you instantiate and return a mobx-state-tree instance.

## Examples

- [Basic example](#basic-example)
- [Local state](#local-state)

## Basic example

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

## Local state

For local or ephemeral state the recommended method is to define the `store` next to the component it will be used in.

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

The principal difference between this example and the first one is that this one does not use a `Provider` to supply the `store` to the rest of the application. It is local to this component only.

This avoids the need to use an alternative mechanism for local state which can create inconsistent code within your application.
