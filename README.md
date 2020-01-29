# mobx-store-provider

[![CircleCI](https://circleci.com/gh/jonbnewman/mobx-store-provider.svg?style=svg)](https://circleci.com/gh/jonbnewman/mobx-store-provider)
[![Coverage Status](https://coveralls.io/repos/github/jonbnewman/mobx-store-provider/badge.svg?branch=master)](https://coveralls.io/github/jonbnewman/mobx-store-provider?branch=master)

React Hooks + [mobx-state-tree](http://mobx-state-tree.js.org/)

**A straight-forward API for using [mobx-state-tree](http://mobx-state-tree.js.org/) with functional React components.**

1. [Installation](#installation)

1. [Basic Example](#basic-example)

1. [API Details and Examples](#api-details-and-examples)

   - [useProvider](#useprovider) - Provide your components with a store
   - [createStore](#createstore) - Create a new store inside a component
   - [useStore](#usestore) - Use a store in a component

1. [Testing](#testing)

## Installation

```bash
# via NPM
npm install mobx-store-provider --save
```

```bash
# via Yarn
yarn add mobx-store-provider
```

## Basic Example

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

```javascript
// AppStore.js (mobx-state-tree store/model)
import { types } from "mobx-state-tree";

const AppStore = types.model({
  user: types.string,
});

export default AppStore;
```

_mobx-store-provider_ lets you setup and access your [mobx-state-tree](http://mobx-state-tree.js.org/) models (referred to as `stores` in this context) from within functional (hooks-based) React components.

It supplies your application with standard [mobx](https://mobx.js.org) observables (mobx-state-tree model instances are themselves observables)...and so it integrates seamlessly with all standard [mobx](https://mobx.js.org) and mobx-compatible libraries, such as [mobx-react](https://github.com/mobxjs/mobx-react) (used in the example above).

## API Details and Examples

- [useProvider](#useprovider)
- [createStore](#createstore)
- [useStore](#usestore)

### useProvider

```javascript
useProvider(storeIdentifier: any = null): Context.Provider
```

React Hook used to retrieve the React `Context.Provider` for a given `storeIdentifier`. This is a wrapper component you can use to provide your application with the store.

Parameters:

- `storeIdentifier` - _(optional)_ Tells _mobx-store-provider_ which store you want the Provider for.

Example:

```javascript
import React from "react";
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
createStore(factory: Function, storeIdentifier: any = null): any
```

React Hook used to instantiate new mobx-state-tree instances inside of components. It returns the store you instantiate and return from the `factory`.

Parameters:

- `factory` - Function where you instantiate and return a mobx-state-tree instance.
- `storeIdentifier` - _(optional)_ Tells _mobx-store-provider_ which store you are creating.

Example:

```javascript
import React from "react";
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
useStore(mapStateToProps: Function = null, storeIdentifier: any = null): any
```

React Hook used to retrieve a `store` for a given `storeIdentifier`.

Parameters:

- `mapStateToProps` - _(optional)_ Function which you can use to select and return specific slices of the store.
- `storeIdentifier` - _(optional)_ Tells _mobx-store-provider_ which store you want to get access to.

Example:

```javascript
// App.jsx (Main App component, we use it to create and provide the store)
import React from "react";
import { types } from "mobx-state-tree";
import { useProvider, createStore } from "mobx-store-provider";
import Header from "./Header";

const User = types.model({
  name: "Batman",
  isCoolGuy: true,
});

const AppStore = types.model({
  user: types.optional(User, {}),
});

function App() {
  const Provider = useProvider();
  const appStore = createStore(() => AppStore.create());
  return (
    <Provider value={appStore}>
      <Header />
    </Provider>
  );
}

export default App;
```

```javascript
// Header.jsx (A component, we use the store inside)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

function selectUserName(store) {
  return store.user.name;
}

function selectCoolStatus(store) {
  return store.user.isCoolGuy;
}

function Header() {
  // We use the store in this component
  const { name, isCoolGuy } = useStore(store => ({
    name: selectUserName(store);
    isCoolGuy: selectCoolStatus(store);
  }));

  return (
    <div>
      User: {name} {isCoolGuy ? "👍" : "👎"}
    </div>
  );
}

export default observer(Header);
```

## Testing

Testing a React app that uses _mobx-state-tree_ and _mobx-store-provider_ is easy.

Here are a few examples using [Jest](https://jestjs.io/) and [react-testing-library](https://github.com/testing-library/react-testing-library):

```javascript
// UserForm.tests.jsx
import { getByTestId, fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { useProvider } from "mobx-store-provider";

import AppStore from "./AppStore";
import UserForm from "./UserForm";

function getTestContainer(children, mockStore) {
  const Provider = useProvider();
  return render(<Provider value={mockStore}>{children}</Provider>).container;
}

describe("UserForm tests", () => {
  test("The form loads correctly", () => {
    const mockState = { name: "Superman" };
    const mockStore = AppStore.create(mockState);
    const container = getTestContainer(<UserForm />, mockStore);
    expect(queryByTestId(container, "input")).toBeInTheDocument();
    expect(queryByTestId(container, "button")).toBeInTheDocument();
    expect(getByTestId(container, "button")).toHaveValue(mockState.name);
  });

  test("When the name changes the store gets updated", () => {
    const mockState = { name: "Superman" };
    const mockStore = AppStore.create(mockState);
    const container = getTestContainer(<UserForm />, mockStore);
    const input = getByTestId(container, "input");
    expect(input).toHaveValue(mockState.name);
    const testName = "Spiderman";
    fireEvent.change(input, {
      target: { value: testName },
    });
    expect(mockStore.name).toBe(testName);
  });

  test("When I click the button, the form submit action is triggered", () => {
    const mockStore = AppStore.create();
    const submit = jest.fn();
    Object.defineProperty(mockStore, "submit", {
      value: submit,
    });
    const container = getTestContainer(<UserForm />, mockStore);
    fireEvent.click(queryByTestId(container, "button"));
    expect(submit).toBeCalled();
  });
});
```

```javascript
// UserForm.jsx (The component we want to test)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

function UserForm() {
  const store = useStore();
  return (
    <form onSubmit={store.submit}>
      <input
        type="text"
        data-testid="input"
        value={store.name}
        onChange={store.changeName}
      />
      <button type="submit" data-testid="button">
        Submit
      </button>
    </form>
  );
}

export default observer(UserForm);
```

```javascript
// AppStore.js (Our main/root mobx-state-tree store/model)
import { types } from "mobx-state-tree";

const AppStore = types
  .model({
    name: types.optional(types.string, "Batman"),
  })
  .actions(self => ({
    changeName(event) {
      self.name = event.target.value;
    },
    submit() {
      console.info(`Submitted: ${self.name}`);
    },
  }));

export default AppStore;
```
