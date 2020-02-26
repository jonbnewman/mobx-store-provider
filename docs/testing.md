---
layout: default
title: Testing
nav_order: 7
---

# Testing

You can test an app that uses **mobx-store-provider** like any other React application.

Here are a few examples using [Jest](https://jestjs.io/) and [react-testing-library](https://github.com/testing-library/react-testing-library#react-testing-library).

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

Below is the component we are testing.

A typical HTML form with a text field and a submit button. In the tests above we are able to test the full functionality of the form, including submission.

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

It is important to note that by testing the form and its submit action above, we are testing the `AppStore` and its actions as well.

You can of course create tests for the store by itself, independent of the component it is used in.

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
