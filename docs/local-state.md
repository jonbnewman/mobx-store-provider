---
layout: default
title: Local state
nav_order: 6
---

# Local state

_How should I handle local state? Should I use this for my small component too?_

- Answer:

  **It is recommended.**

- Reasoning:

  Doing so avoids the need to use an alternative mechanism for local state, and having your state managed the same way throughout your application makes it easier to reason about.

## Example

For local or ephemeral state, it is recommended to use define the `store` next to the component it will be used in:

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

// Create and use the store in this component
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

With a more complex component (such as one that may have child components itself) you might want to supply its descendants with the store, you can of course do so using the [useProvider hook](/api/useProvider).

Just remember that if you end up using multiple stores, they must be provided and retreived using their respective unique `identifier`. For more information see [using multiple stores](/using-multiple-stores).
