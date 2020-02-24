---
layout: default
title: Using multiple stores
nav_order: 5
---

## Using multiple stores

Creating and using multiple stores in a single application is relatively easy using _mobx-store-provider_.

In the API documentation above, you may have noticed an `identifier` you can use along with [useProvider](#useprovider) and [useStore](#useStore). This optional value tells _mobx-store-provider_ which store you want to use based on the unique `identifier` you pass it.

Here is a short example:

```javascript
// App.jsx
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import { OwnerStore, CatStore, CatStoreId } from "./stores";
import PetDisplay from "./PetDisplay";

function App() {
  const OwnerProvider = useProvider();
  const owner = createStore(() => OwnerStore.create({ name: "Jonathan" }));

  const CatProvider = useProvider(CatStoreId);
  const cat = createStore(() => CatStore.create({ name: "Cleo" }));

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
