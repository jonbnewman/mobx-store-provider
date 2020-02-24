# mobx-store-provider

[![CircleCI](https://circleci.com/gh/jonbnewman/mobx-store-provider.svg?style=svg)](https://circleci.com/gh/jonbnewman/mobx-store-provider)
[![Coverage Status](https://coveralls.io/repos/github/jonbnewman/mobx-store-provider/badge.svg?branch=master&r=4)](https://coveralls.io/github/jonbnewman/mobx-store-provider?branch=master)

[![NPM Package](https://img.shields.io/npm/v/mobx-store-provider.svg?logo=npm&r=1)](https://www.npmjs.com/package/mobx-store-provider)
![Typescript](https://img.shields.io/npm/types/mobx-store-provider.svg?logo=typescript)
![Package size](https://img.shields.io/bundlephobia/minzip/mobx-store-provider)
![MIT License](https://img.shields.io/npm/l/mobx-store-provider.svg)

React Hooks + [mobx-state-tree](http://mobx-state-tree.js.org/)

**A straight-forward API for using [mobx-state-tree](http://mobx-state-tree.js.org/) with functional React components.**

1. [Installation](https://jonbnewman.github.io/mobx-store-provider/#installation)

1. [Basic example](https://jonbnewman.github.io/mobx-store-provider/#basic-example)

1. [API details and examples](https://jonbnewman.github.io/mobx-store-provider/#api-details-and-examples)

   - [useProvider](https://jonbnewman.github.io/mobx-store-provider/#useprovider) - Provide your components with a store
   - [createStore](https://jonbnewman.github.io/mobx-store-provider/#createstore) - Create a new store inside a component
   - [useStore](https://jonbnewman.github.io/mobx-store-provider/#usestore) - Use a store in a component

1. [Using multiple stores](https://jonbnewman.github.io/mobx-store-provider/#using-multiple-stores)
1. [Typescript](https://jonbnewman.github.io/mobx-store-provider/#typescript)
1. [Testing](https://jonbnewman.github.io/mobx-store-provider/#testing)

## Installation

```bash
npm i mobx-store-provider
```

```bash
yarn add mobx-store-provider
```

## Basic example

```JSX
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

```JSX
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

```javascript
// AppStore.js (mobx-state-tree store/model)
import { types } from "mobx-state-tree";

const AppStore = types.model({
  user: types.string,
});

export default AppStore;
```

_mobx-store-provider_ lets you setup and access your [mobx-state-tree](http://mobx-state-tree.js.org/) models (referred to as `stores` in this context) from within functional (hooks-based) React components.

It supplies your application with standard [mobx](https://mobx.js.org) observables (mobx-state-tree model instances are themselves observables)...and so it integrates seamlessly with all standard [mobx](https://mobx.js.org) and mobx-compatible libraries, such as [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) (used in the example above).

**[See the full docs](https://jonbnewman.github.io/mobx-store-provider)**
