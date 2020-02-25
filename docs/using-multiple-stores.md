---
layout: default
title: Using multiple stores
nav_order: 5
---

# Using multiple stores

Creating and using multiple stores in a single application is relatively easy using _mobx-store-provider_.

In the API documentation above, you may have noticed an `identifier` you can use along with [useProvider](#useprovider) and [useStore](#useStore). This optional value tells _mobx-store-provider_ which store you want to use based on the unique `identifier` you pass it.

## Example

In the `App` component, we create both the `cat` and `owner`, which are then provided to the rest of the application via their `Provider`.

```javascript
// App.jsx
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import { OwnerStore, CatStore, CatStoreId } from "./stores";
import PetDisplay from "./PetDisplay";

function App() {
  const owner = createStore(() => OwnerStore.create({ name: "Jonathan" }));
  const OwnerProvider = useProvider();

  const cat = createStore(() => CatStore.create({ name: "Cleo" }));
  const CatProvider = useProvider(CatStoreId);

  return (
    <OwnerProvider value={owner}>
      <CatProvider value={cat}>
        <PetDisplay />
      </CatProvider>
    </OwnerProvider>
  );
}

export default App;
```

Note that each `Provider` must be retrieved using its own `identifier`. In the case of the owner, we just use the default one supplied by _mobx-store-provider_.

In the `PedDisplay` component we retrieve each store with [useStore](/api/useStore) making sure to pass the same identifier that we used in their respective `Provider`.

```javascript
// PetDisplay.jsx
import React from "react";
import { useStore } from "mobx-store-provider";
import { CatStoreId } from "./stores";

function PetDisplay() {
  const owner = useStore();
  const cat = useStore(CatStoreId);
  return (
    <div>
      {owner.name} has a cat named {cat.name}
    </div>
  );
}

export default PetDisplay;
```

To keep things clean we define the stores in a separate module.

```javascript
// stores.js
import { types } from "mobx-state-tree";

const OwnerStore = types.model({
  name: types.string,
});

const CatStoreId = "CatStore";
const CatStore = types.model({
  name: types.string,
});

export { OwnerStore, CatStoreId, CatStore };
```
