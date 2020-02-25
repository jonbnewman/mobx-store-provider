---
layout: default
title: Basic example
nav_order: 3
---

# Basic example

The following shows an example application using _mobx-store-provider_.

## App component

At the core of the application we define the main `App` component.

Inside of the `App` we use hooks provided by _mobx-store-provider_ to:

1. Create the `appStore` instance using the [createStore](http://mobx-store-provider.overfoc.us/api/createStore) hook
1. Retrieve the store `Provider` using the [useProvider](http://mobx-store-provider.overfoc.us/api/useProvider) hook

```javascript
// App.jsx (Main App component, we use it to create and provide the store)
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import AppStore from "./AppStore";
import UserDisplay from "./UserDisplay";

function App() {
  // Create the AppStore instance
  const appStore = createStore(() => AppStore.create({ user: "Jonathan" }));

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

Note that we also wrap our component using `observer()` from the [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) library, this ensures our component renders any updates made to the `store`.

## Defining the store

The `AppStore` is a normal _mobx-state-tree_ model:

```javascript
// AppStore.js (mobx-state-tree store/model)
import { types } from "mobx-state-tree";

const AppStore = types.model({
  user: types.string,
});

export default AppStore;
```

In the context of _mobx-store-provider_, this is referred to as a `store`. This is what your application and components use for state and state-related actions.

If you are new to _mobx-state-tree_, it is recommended you read through the [_mobx-state-tree_ documentation](https://mobx-state-tree.js.org).
