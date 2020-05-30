---
layout: default
title: Local state
nav_order: 6
---

# Local state

_How should I handle local state? Should I use this for my small component too?_

- Answer:

  **It is recommended, but it depends.**

- Reasoning:

  1. **Doing so avoids the need to use an alternative mechanism for local state.**

     Managing your state the same way throughout your app makes it easier to reason about.

  1. **Sometimes you create local state that you later realize belongs in a store.**

     If your state is already contained in a `store` it makes it much easier to refactor and move around.

With that said this may not fit you, your team, or your projects needs for one reason or another.

## Example

For local or ephemeral state, it is recommended to define the `store` next to (or at least in the same directory as) the component it will be used in:

```javascript
import React from "react";
import { observer } from "mobx-react";
import { types } from "mobx-state-tree";
import { useCreateStore } from "mobx-store-provider";

// Define the local store here
const PetStore = types.model({
  name: "Rusty",
  type: "Dog",
});

// Create and use the store in this component
function PetComponent() {
  const localStore = useCreateStore(() => PetStore.create());
  return (
    <div>
      {localStore.name} is a {localStore.type}
    </div>
  );
}

export default observer(PetComponent);
```

With a more complex component (ie: one that has child components itself) you might want to supply its descendants with this `store`, you can of course do so using another [useProvider hook](/api/useProvider).

Just remember that if you end up using multiple stores, they must be provided and retreived using their respective unique `identifier`. For more information see [multiple stores](/multiple-stores).

[Next: **Typescript**](/typescript){: .btn .btn-blue }
