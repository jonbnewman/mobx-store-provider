---
layout: default
title: Basic example
nav_order: 3
---

# Basic example

The following shows a simple/basic example application using _mobx-store-provider_:

## App component

At the core of our application we define the main `App` component. Inside of it, we use the hooks provided by _mobx-store-provider_ to both create the store and then wrap our application with the `Provider`, supplying the `appStore` to its descendents.

```javascript
// App.jsx (Main App component, we use it to create and provide the store)
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import AppStore from "./AppStore";
import UserDisplay from "./UserDisplay";

function App() {
  // Get the Provider for our AppStore
  const Provider = useProvider();

  // Create our AppStore instance
  const appStore = createStore(() => AppStore.create({ user: "Jonathan" }));

  // Wrap our application with the Provider passing it the appStore
  return (
    <Provider value={appStore}>
      <UserDisplay />
    </Provider>
  );
}

export default App;
```

Inside of the `App` component we:

- Create the `appStore` instance using the [createStore](/api/createStore) hook
- Retrieve the `Provider` using the [useProvider](/api/useProvider) hook
- Wrap our application with the `Provider`, supplying it with the `appStore`

This creates our main `appStore` which is then shared with the rest of our application via its `Provider`.

## Using the store

In another component somewhere in the application, we want to use or gain access to the `appStore`.

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

Note that we also wrap our component using `observer()` from the [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) library, this ensures our component renders any updates made to the store.

## Defining the store

The `AppStore` is a normal _mobx-state-tree_ model. In the context of this library, this is referred to as a `store`.

```javascript
// AppStore.js (mobx-state-tree store/model)
import { types } from "mobx-state-tree";

const AppStore = types.model({
  user: types.string,
});

export default AppStore;
```

This is what your application and components use for state and state-related actions.

If you are new to _mobx-state-tree_, it is recommended you read through the [_mobx-state-tree_ documentation](https://mobx-state-tree.js.org).
