# mobx-store-provider

React Hooks + [mobx-state-tree](http://mobx-state-tree.js.org/)

**A straight-forward API for using [mobx-state-tree](http://mobx-state-tree.js.org/) with functional React components.**

## Install

```bash
# via NPM
npm install mobx-store-provider --save
```

```bash
# via Yarn
yarn add mobx-store-provider
```

### Example

```javascript
// App.js (Main App component, we use it to create and provide the store)
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import AppStore from "./AppStore";
import MyNameDisplay from "./MyNameDisplay";

function App() {
  const Provider = useProvider();
  const appStore = createStore(() => AppStore.create({ user: "Jonathan" }));
  return (
    <Provider value={appStore}>
      <UserDisplay />
    </Provider>
  );
}

export default App;
```

```javascript
// UserDisplay.js (A component, we use the store from above inside it)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

function UserDisplay() {
  const appStore = useStore();
  return <div>{appStore.user}</div>;
}

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

## API Details and Examples

- [useProvider](#useprovider)

  React Hook used to retrieve the React `Context.Provider` for a given `storeIdentifier`.

- [createStore](#createstore)

  React Hook used to instantiate new mobx-state-tree instances inside of components.

- [useStore](#usestore)

  React Hook used to retrieve a `store` for a given `storeIdentifier`.

- [disposeStore](#disposestore)

  Used to cleanup the store reference.

### useProvider

```javascript
useProvider(storeIdentifier: any = null): Context.Provider`
```

React Hook used to retrieve the React `Context.Provider` for a given `storeIdentifier`.

This is a wrapper component you can use to provide your application with the store.

The `storeIdentifier` tells _mobx-store-provider_ which store you want the Provider for (each store gets it's own). If omitted, the default identifier is `null`.

```javascript
import { useProvider } from "mobx-store-provider";
import AppStore from "./AppStore";
const appStore = AppStore.create();

function App() {
  const Provider = useProvider();
  return (
    <Provider value={appStore}>
      <MyComponents />
    </Provider>
  );
}

export default App;
```

### createStore

```javascript
createStore(StoreFactory: Function): any
```

React Hook used to instantiate new mobx-state-tree instances inside of components.

It takes a factory `Function` as its input, you should instantiate and return a mobx-state-tree instance within that function.

```javascript
import { createStore, useProvider } from "mobx-store-provider";
import AppStore from "./AppStore";

function App() {
  const Provider = useProvider();
  const appStore = createStore(() => AppStore.create());
  return <Provider value={appStore}>...</Provider>;
}

export default App;
```

### useStore

```javascript
useStore(storeIdentifier: any = null, mapStateToProps: Function = identity): any
```

React Hook used to retrieve a `store` for a given `storeIdentifier`.

The `storeIdentifier` tells _mobx-store-provider_ which store you want to get access to. The default identifier is `null`.

You can optionally pass it a `mapStateToProps` function which you can use to select and return specific slices of the store into your components with. In the absense of a `mapStateToProps` callback, it will return the store instance.

```javascript
// App.js (Main App component, we use it to create and provide the store)
import { useProvider, createStore } from "mobx-store-provider";
import Header from "./Header";
import AppStore from "./AppStore";

// Export our appStore identifier so other components can use it
export const appStore = "app-store";

function App() {
  const Provider = useProvider(appStore);
  return (
    <Provider value={createStore(() => AppStore.create())}>
      <Header />
    </Provider>
  );
}

export default App;
```

```javascript
// Header.js (A component, we use the store inside)
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

// We import the store identifier from above
import { appStore } from "./App";

// A selector we use to grab the user from the store
function selectUser(store) {
  return store.user;
}

function Header() {
  // We use the appStore in this component
  const user = useStore(appStore, selectUser);
  return <div>User: {user}</div>;
}

export default observer(Header);
```

### disposeStore

```javascript
disposeStore(storeIdentifier: any = null): undefined
```

Used to cleanup the store reference.

You might encounter this scenario if you created a store for a specific component (ie: not a long-lived root store/etc), and that component is removed from the DOM.

In that case you need to call `disposeStore(storeIdentifier)` so that the store references can be fully released and garbage collected.

```javascript
// MyPet component, it has its own local store, and it is assumed it will
// be removed from the DOM at some point. So we have to worry about disposal.
import React, { useEffect } from "react";
import { useProvider, createStore, disposeStore } from "mobx-store-provider";

// We import the mobx-state-tree store/model used in the component
import MyPetAnimal from "./MyPetAnimal";

// Create and export the identifier for our store
export const myPetAnimal = "my-pet-animal";

function MyPet() {
  useEffect(() => disposeStore(myPetAnimal), []);
  const Provider = useProvider(myPetAnimal);
  return (
    <Provider value={createStore(() => MyPetAnimal.create())}>
      <>... The rest of the MyPet component ...</>
    </Provider>
  );
}

export default MyPet;
```

## Testing

Testing a React app that uses _mobx-state-tree_ and _mobx-store-provider_ is easy.

Here are a couple examples, using [Jest](https://jestjs.io/) and [react-testing-library](https://github.com/testing-library/react-testing-library):

```javascript
// MyTests.tests.jsx
import { getByTestId, fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { types } from "mobx-state-tree";
import { observer } from "mobx-react";
import {
  useProvider,
  createStore,
  useStore,
  disposeStore,
} from "mobx-store-provider";

const AppStore = types
  .model({
    user: types.string,
  })
  .actions(self => ({
    setUser(user: string) {
      self.user = user;
    },
  }));

describe("My tests", () => {
  test("When I click the user name label it changes", () => {
    const userName = "Keanu Reeves";
    const altUsername = "Neo";

    const UserDisplay = observer(() => {
      const store = useStore();
      return (
        <div onClick={() => store.setUser(altUsername)} data-testid="label">
          {store.user}
        </div>
      );
    });

    function AppComponent() {
      const Provider = useProvider();
      const appStore = createStore(() => AppStore.create({ user: userName }));
      return (
        <Provider value={appStore}>
          <UserDisplay />
        </Provider>
      );
    }

    const container = render(<AppComponent />).container;
    expect(container).toHaveTextContent(userName);
    fireEvent.click(getByTestId(container, "label"));
    expect(container).toHaveTextContent(altUsername);
  });

  // This is not part of mobx-store-provider but as an aside, you could also
  // test a store separate from React like this:
  test("When I trigger the setUser action the user changes", () => {
    const userName = "Keanu Reeves";
    const altUsername = "Neo";

    const store = AppStore.create({ user: userName });
    expect(store.user).toBe(userName);
    store.setUser(altUsername);
    expect(store.user).toBe(altUsername);
  });
});
```
