# mobx-store-provider

Use React Hooks with mobx-state-tree.

## Install

```bash
# via NPM
npm install mobx-store-provider --save
```

```bash
# via Yarn
yarn add mobx-store-provider
```

## Intro

Using Hooks with mobx-state-tree requires a bit of glue logic, this library provides that.

mobx-store-provider supplies utilities for creating and supplying your React components with a mobx-state-tree store, so they can bind to and trigger actions on it.

```javascript
// app.js
import React from "react";
import { types } from "mobx-state-tree";
import { createProvider, createStore } from "mobx-store-provider";
import MyNameDisplay from "./MyNameDisplay";

const AppStore = types.model({
  name: types.string,
});

export default () => {
  const Provider = createProvider("app");
  const appStore = createStore(() => AppStore.create({ name: "Jonathan" }));
  return (
    <Provider value={appStore}>
      <MyNameDisplay />
    </Provider>
  );
};
```

```javascript
// MyNameDisplay.js
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

export default observer(() => {
  const appStore = useStore("app");
  return <div>{appStore.name}</div>;
});
```

### API

- `createProvider(storeIdentifier: any = null): Provider`

  React Hook which you can use to create and/or retrieve the React `Context.Provider` for a given `storeIdentifier`. This is the wrapper component you can use to provide your application with the store.

  ```javascript
  import { createProvider } from "mobx-store-provider";
  const myStore = MyStore.create();

  export default function MainApp() {
    const Provider = createProvider();
    return (
      <Provider value={myStore}>
        <div>My awesome app</div>
      </Provider>
    );
  }
  ```

- `createStore(storeIdentifier: any = null): any`

  React Hook which you can use to instantiate new mobx-state-tree instances inside of components.

  It takes a `Function` as its input, you should instantiate and return your mobx-state-tree instance within that function.

  ```javascript
  import { createStore, createProvider } from "mobx-store-provider";

  function MyComponent() {
    const Provider = createProvider();
    const myStore = createStore(() => MyStore.create());
    return <Provider value={myStore}>...</Provider>;
  }
  ```

- `useStore(storeIdentifier: any = null, mapStateToProps: Function = identity): any`

  React Hook which you can use in your other components to retrieve and use a `store` for a given `storeIdentifier`.

  You can optionally pass it a `mapStateToProps` function which you can use to select and return specific slices of data into your components with. This would be analagous to redux selectors.

  In the absense of a `mapStateToProps` callback, it will return the store instance.

  ```javascript
  import { createStore, createProvider, useStore } from "mobx-store-provider";
  import { types } from "mobx-state-tree";
  const storeIdentifier = "house";

  function selectOwner(store) {
    return store.owner;
  }

  export default function Dashboard() {
    const Provider = createProvider(storeIdentifier);
    const myStore = createStore(() => types.model({ owner: "Jonathan" }).create());
    return (
      <Provider value={myStore}>
        <House />
      </Provider>
    );
  }

  function House() {
    const { owner } = useStore(storeIdentifier, function mapStateToProps(store) {
      return {
        owner: selectOwner(store),
      };
    });

    return (
      <>
        <div>House</div>
        <div>Owner: {owner}</div>
      </>
    );
  }
  ```

* `useConsumer(storeIdentifier: any = null): Consumer`

  React Hook which you can use in your other components to consume and use a `store` for a given `storeIdentifier`. This is an alternative to using `useStore`, it provides the `store` as a render-prop of `Consumer`.

  ```javascript
  import { createStore, createProvider, useConsumer } from "mobx-store-provider";
  import { types } from "mobx-state-tree";
  const storeIdentifier = "house";

  function selectOwner(store) {
    return store.owner;
  }

  export default function Dashboard() {
    const Provider = createProvider(storeIdentifier);
    const myStore = createStore(() => types.model({ owner: "Jonathan" }).create());
    return (
      <Provider value={myStore}>
        <House />
      </Provider>
    );
  }

  function House() {
    const Consumer = useConsumer(storeIdentifier);
    return (
      <Consumer>
        {store => (
          <>
            <div>House</div>
            <div>Owner: {store.owner}</div>
          </>
        )}
      </Consumer>
    );
  }
  ```

* `disposeStore(storeIdentifier: any = null): undefined`

  Cleanup, if your app doesn't need the store and Provider anymore.

  You might encounter this scenario if you created a store for a specific component (ie: not a long-lived root store/etc), and that component is removed.

  In that case you need to call `dispose()` so that the store can be fully released and garbage collected.

  ```javascript
  import React, { useEffect } from "react";
  import { types } from "mobx-state-tree";

  import { createProvider, createStore, disposeStore } from "mobx-store-provider";

  const MyStore = types.model({
    name: "Jonathan Newman",
  });

  export default function MyComponent() {
    useEffect(() => disposeStore("my-app"), []);
    const Provider = createProvider("my-app");
    const myStore = createStore(() => MyStore.create());
    return (
      <Provider value={myStore}>
        <div>...</div>
      </Provider>
    );
  }
  ```

## What problem does mobx-store-provider solve?

When using mobx-state-tree in an application, you have to somehow provide the store to your component.

With class-based components, you would use `inject` and/or `observer` to supply your components with their mobx-state-tree/store and to bind the render function to changes detected.

Here is a class-based example using `@inject` and `@observer` decorators:

```javascript
import React, { Component } from "react";
import { Provider } from "mobx-react";
import { types } from "mobx-state-tree";

// We import our child component from another module
import MyNameDisplay from "./MyNameDisplay";

// Our mobx-state-tree store definition
const AppStore = types.model({
  name: types.string,
});

// Main component which creates appStore, wraps our content in the provider and passes it as the store value.
export default class MyComponent extends Component {
  appStore = AppStore.create({ name: "Jonathan" });
  render() {
    return (
      <Provider store={this.appStore}>
        <MyNameDisplay />
      </Provider>
    );
  }
}
```

In another file, you have the `MyNameDisplay` component:

```javascript
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// Using inject, we get the store from the provider and use it in the render method.
@inject("store")
@observer
export default class MyNameDisplay extends Component {
  render() {
    return <div>{this.props.store.name}</div>;
  }
}
```

If you are using class-based components this works well enough, but (inject in particular) has a few possible issues (especially if you want to use Hooks):

1. It requires the use of decorators for `@inject` and `@observer`.

   This may be a problem if you don't have control of or know how to add that capability to your bundler. As an example, if you started with a create-react-app base and haven't ejected - then you can't use decorators.

1. In lieu of decorators, or if you want to use Functional components, it requires you to wrap your components with `inject()` and `observer()`.

   ```javascript
   import React from "react";
   import { inject, observer } from "mobx-react";

   const MyNameDisplay = inject("store")(observer(props => <div>{props.store.name}</div>));
   ```

   That is pretty ugly syntax, I kind of have to read it a bit to understand it. And that's a simple example...imagine something more real-worldy...ugh.

   In reality, `inject()` in particular works best with a decorator on a class-based component. It isn't ideal for functional/hook-based components.

## The solution: mobx-store-provider

The same example from above, but using mobx-store-provider with hooks on functional components instead:

```javascript
import React from "react";
import { types } from "mobx-state-tree";
import StoreProvider, { createStore } from "mobx-store-provider";

// We import our child component from another module
import MyNameDisplay from "./MyNameDisplay";

// Our mobx-state-tree store definition
const AppStore = types.model({
  name: types.string,
});

// Create the provider and hook we can use in our application to access this store
const { Provider } = StoreProvider();

// Now we use the hook createStore to create appStore, and then wrap our application with
// Provider, passing in appStore for the value.
export default function App() {
  const appStore = createStore(() => AppStore.create({ name: "Jonathan" }));
  return (
    <Provider value={appStore}>
      <MyNameDisplay />
    </Provider>
  );
}
```

In another file, you have the `MyNameDisplay` component:

```javascript
import React from "react";
import { observer } from "mobx-react";

import StoreProvider from "mobx-store-provider";
const { useStore } = StoreProvider();

export default observer(function MyNameDisplay() {
  const appStore = useStore();
  return <div>{appStore.name}</div>;
});
```
