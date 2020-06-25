---
layout: default
title: Basic example
nav_order: 2
---

# Basic example

The following shows an example application using **mobx-store-provider**.

## App component

At the core of the application we define the main `App` component.

Inside of the `App` we use hooks provided by **mobx-store-provider** to:

1. Create the `appStore` instance with the [useCreateStore](http://mobx-store-provider.overfoc.us/api/useCreateStore) hook
1. Retrieve the `Provider` with the [useProvider](http://mobx-store-provider.overfoc.us/api/useProvider) hook

```javascript
// App.jsx (Main App component, we use it to create and provide the store)
import React from "react";
import { useProvider, useCreateStore } from "mobx-store-provider";
import AppStore from "./AppStore";
import UserDisplay from "./UserDisplay";

function App() {
  // Create the AppStore instance
  const appStore = useCreateStore(() => AppStore.create({ user: "Jonathan" }));

  // Get the Provider for the AppStore
  const Provider = useProvider();

  // Wrap the application with the Provider passing it the appStore
  return (
    <Provider value={appStore}>
      <UserDisplay />
    </Provider>
  );
}

export default App;
```

Note that we wrap the application with the `Provider`, supplying it the `appStore` as its value.

This makes the `appStore` available to the rest of the application.

## Using the store

In another component somewhere in the application we want to use or gain access to the `appStore`.

To do this, we use the [useStore](/api/useStore) hook:

```javascript
// UserDisplay.jsx (A component, we use the store from above inside it)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

function UserDisplay() {
  // Get access to the store
  const appStore = useStore();
  return <div>{appStore.user}</div>;
}

// Wrap it with mobx-react observer(), so updates get rendered
export default observer(UserDisplay);
```

Note that we also wrap the component with `observer()` from the [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) library.

This is critical, as it ensures the component will render any updates made to the `appStore`. For more information, see the [observer documentation](https://mobx.js.org/refguide/observer-component.html#observer) for the [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) library.

## Defining the store

The code above uses the `AppStore` **mobx-state-tree** model. In the context of **mobx-store-provider** this is referred to as a `store`.

```javascript
// AppStore.js (mobx-state-tree store/model)
import { types } from "mobx-state-tree";

const AppStore = types.model({
  user: types.string,
});

export default AppStore;
```

If you are new to _mobx-state-tree_, it is recommended you read through the [_mobx-state-tree_ documentation](https://mobx-state-tree.js.org).

[Next: **API details and examples**](/api-details-and-examples){: .btn .btn-blue }
