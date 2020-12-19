---
layout: default
title: Local state
nav_order: 8
---

# Local state

_How should I handle local state? Should I use this for my small component too?_

- Answer:

  **Maybe, it depends.**

- Here are some possible scenarios and my suggestions:

  1. **Does my state have a lot of related business logic?**

     If so, I would use **mobx-store-provider** for local state.

  1. **Is my state basic and has little related logic?**

     If so, I would use React `useState`.

## Example

The following shows an example of local state with **mobx-store-provider**:

```javascript
import React from "react";
import { observer } from "mobx-react";
import { types } from "mobx-state-tree";
import { useCreateStore } from "mobx-store-provider";

function PetComponent() {
  const pet = useCreateStore(
    types
      .model({
        name: "Rusty",
        type: "Dog",
      })
      .actions((self) => ({
        action() {
          console.log("Ruff!");
        },
      })),
  );
  return (
    <div>
      {pet.name} is a {pet.type}
      <button onClick={pet.action}>Make noise</button>
    </div>
  );
}

export default observer(PetComponent);
```

With a more complex component (ie: one that has child components itself) you might want to supply its descendants with this `store`, you can of course do so using another [useProvider hook](/api/useProvider).

Just remember that if you end up using multiple stores, they must be provided and retreived using their respective unique `identifier`. For more information see [multiple stores](/multiple-stores).

[Next: **Typescript**](/typescript){: .btn .btn-blue }
