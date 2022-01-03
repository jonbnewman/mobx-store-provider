# mobx-store-provider

[![CircleCI](https://circleci.com/gh/jonbnewman/mobx-store-provider.svg?style=svg)](https://circleci.com/gh/jonbnewman/mobx-store-provider)
[![Coverage Status](https://coveralls.io/repos/github/jonbnewman/mobx-store-provider/badge.svg?branch=master&r=5)](https://coveralls.io/github/jonbnewman/mobx-store-provider?branch=master)

[![NPM Package](https://img.shields.io/npm/v/mobx-store-provider.svg?logo=npm&r=5)](https://www.npmjs.com/package/mobx-store-provider)
![Typescript](https://img.shields.io/npm/types/mobx-store-provider.svg?logo=typescript)
![Package size](https://img.shields.io/bundlephobia/minzip/mobx-store-provider?r=5)
![MIT License](https://img.shields.io/npm/l/mobx-store-provider.svg)

**mobx-store-provider** is a library that provides [React Hooks](https://reactjs.org/docs/hooks-intro.html) to setup and access [mobx-state-tree](http://mobx-state-tree.js.org/) models from within [React Function Components](https://www.robinwieruch.de/react-function-component).

Its goal is to provide a straight-forward, minimalist, and terse API that allows you to easily incorporate **mobx-state-tree** into functional React components.

1. [Installation](https://mobx-store-provider.jonbnewman.dev/)
1. [Basic example](https://mobx-store-provider.jonbnewman.dev/basic-example)
1. [API details and examples](https://mobx-store-provider.jonbnewman.dev/api-details-and-examples)
   - [useProvider](https://mobx-store-provider.jonbnewman.dev/api/useProvider) - Provide your components with a store
   - [useCreateStore](https://mobx-store-provider.jonbnewman.dev/api/useCreateStore) - Create a new store inside a component
   - [useStore](https://mobx-store-provider.jonbnewman.dev/api/useStore) - Use a store in a component
   - [getStore](https://mobx-store-provider.jonbnewman.dev/api/useStore) - Use a store outside a component
1. [Multiple stores](https://mobx-store-provider.jonbnewman.dev/multiple-stores)
1. [Local state](https://mobx-store-provider.jonbnewman.dev/local-state)
1. [Typescript](https://mobx-store-provider.jonbnewman.dev/typescript)
1. [Testing](https://mobx-store-provider.jonbnewman.dev/testing)
1. [Motivation](https://mobx-store-provider.jonbnewman.dev/motivation)
1. [Upgrading 1.x -> 2.x](https://mobx-store-provider.jonbnewman.dev/upgrade)

---

## Installation

```bash
npm i mobx-store-provider
```

```bash
yarn add mobx-store-provider
```

## Basic example

The following shows an example application using **mobx-store-provider**.

### App component

At the core of the application we define the main `App` component.

Inside of the `App` we use hooks provided by **mobx-store-provider** to:

1. Create the `appStore` instance with the [useCreateStore](https://mobx-store-provider.jonbnewman.dev/api/useCreateStore) hook
1. Retrieve the `Provider` with the [useProvider](https://mobx-store-provider.jonbnewman.dev/api/useProvider) hook

```javascript
// App.jsx (Main App component, we use it to create and provide the store)
import React from "react";
import { useProvider, useCreateStore } from "mobx-store-provider";
import AppStore from "./AppStore";
import UserDisplay from "./UserDisplay";

function App() {
  // Create the AppStore instance
  const appStore = useCreateStore(AppStore, { user: "Jonathan" });

  // Get the Provider for the AppStore
  const Provider = useProvider(AppStore);

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

### Using the store

In another component somewhere in the application we want to use or gain access to the `appStore`.

To do this, we use the [useStore](https://mobx-store-provider.jonbnewman.dev/api/useStore) hook:

```javascript
// UserDisplay.jsx (A component, we use the store from above inside it)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";
import AppStore from "./AppStore";

function UserDisplay() {
  // Get access to the store
  const appStore = useStore(AppStore);
  return <div>{appStore.user}</div>;
}

// Wrap it with mobx-react observer(), so updates get rendered
export default observer(UserDisplay);
```

Note that we also wrap the component with `observer()` from the [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) library.

This is critical, as it ensures the component will render any updates made to the `appStore`. For more information, see the [observer documentation](https://mobx.js.org/refguide/observer-component.html#observer) for the [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) library.

### Defining the store

The code above uses the `AppStore` _mobx-state-tree_ model. In the context of **mobx-store-provider** this is referred to as a `store`.

```javascript
// AppStore.js (mobx-state-tree store/model)
import { types } from "mobx-state-tree";

const AppStore = types.model({
  user: types.string,
});

export default AppStore;
```

If you are new to _mobx-state-tree_, it is recommended you read through the [_mobx-state-tree_ documentation](https://mobx-state-tree.js.org).

---

**[See the full docs](http://mobx-store-provider.overfoc.us)**
