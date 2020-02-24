---
layout: default
title: Typescript
nav_order: 6
---

## Typescript

Using _mobx-store-provider_ and [retaining the strong typing provided by _mobx-state-tree_](https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time) is simple.

```javascript
/// AppStore.ts (mobx-state-tree store/model)
import { types, Instance } from "mobx-state-tree";

const AppStore = types.model({
  user: types.optional(types.string, ""),
});

// Create an interface to represent an instance of the AppStore
interface IAppStore extends Instance<typeof AppStore> {}

export { AppStore, IAppStore };
```

It is important to note that when using [createStore](#createstore) or [useStore](#useStore) typescript needs to be informed what type is being returned.

Since it is decided at runtime, you must specify this explicitly:

```javascript
// App.tsx
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import { AppStore, IAppStore } from "./AppStore";

function UserDisplay() {
  // With this declaration, typescript knows the appStore is an AppStore
  const appStore: IAppStore = useStore();
  return <div>{appStore.user}</div>;
}

function App() {
  const Provider = useProvider();

  // With this declaration, typescript knows the appStore is an AppStore
  const appStore: IAppStore = createStore(() => AppStore.create());

  /**
   * The following will not compile, it will cause a typescript error
   * because `foobar` is not a property of an `AppStore`
   */
  console.info(appStore.foobar);

  return (
    <Provider value={appStore}>
      <UserDisplay />
    </Provider>
  );
}

export default App;
```

## Testing

Testing a React app that uses _mobx-state-tree_ and _mobx-store-provider_ is easy.

Here are a few examples using [Jest](https://jestjs.io/) and [react-testing-library](https://github.com/testing-library/react-testing-library#react-testing-library):

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
