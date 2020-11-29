---
layout: default
title: Multiple stores
nav_order: 7
---

# Multiple stores

You may have a need to instantiate multiple stores for your particular application. **mobx-store-provider** supports this use case via a unique `identifier` you can pass into the [useProvider](/api/useProvider) and [useStore](/api/useStore) hooks.

This optional value tells **mobx-store-provider** which store you want to use based on the unique `identifier` you pass to it.

## Example

In the `App` component, we create both `Doug` and `Kevin`, which are then provided to the rest of the application via their respective `Provider`.

```javascript
// App.jsx
import React from "react";
import { useProvider, useCreateStore } from "mobx-store-provider";
import { PersonStore, dougId, kevinId } from "./stores";
import PersonDisplay from "./PersonDisplay";

function App() {
  const doug = useCreateStore(PersonStore, { name: "Doug" });
  const DougProvider = useProvider(PersonStore, dougId);

  const kevin = useCreateStore(PersonStore, { name: "Kevin" });
  const KevinProvider = useProvider(PersonStore, kevinId);

  return (
    <DougProvider value={doug}>
      <KevinProvider value={kevin}>
        <PersonDisplay />
      </KevinProvider>
    </DougProvider>
  );
}

export default App;
```

Note that each `Provider` must be retrieved using its own `identifier`. In the case of the `owner`, we just use the default one supplied by **mobx-store-provider**.

In the `PersonDisplay` component we get each store with the [useStore hook](/api/useStore), making sure to pass the same `identifier` used when retreiving their respective `Provider`:

```javascript
// PersonDisplay.jsx
import React from "react";
import { useStore } from "mobx-store-provider";
import { PersonStore, dougId, kevinId } from "./stores";

function PersonDisplay() {
  const doug = useStore(PersonStore, dougId);
  const kevin = useStore(PersonStore, kevinId);
  return (
    <div>
      {doug.name} and {kevin.name} are here.
    </div>
  );
}

export default PersonDisplay;
```

To keep things clean in this example we define the `PersonStore` and the identifiers in a separate module.

```javascript
// stores.js
import { types } from "mobx-state-tree";

const PersonStore = types.model({
  name: types.string,
});

const dougId = "doug";
const kevinId = "kevin";

export { PersonStore, dougId, kevinId };
```

[Next: **Local state**](/local-state){: .btn .btn-blue }
