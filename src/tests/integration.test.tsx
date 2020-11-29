import React from "react";
import { observer } from "mobx-react";
import { types } from "mobx-state-tree";
import { getByTestId, fireEvent } from "@testing-library/dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, useCreateStore, useStore } from "../";

const TestStore = types
  .model({
    name: types.optional(types.string, "TestStore"),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
  }));

function makeContainer(contents: any) {
  return render(contents).container as HTMLElement;
}

export { TestStore, makeContainer };

describe("integration", () => {
  afterEach(cleanup);

  test("can provide a created store using useProvider, useCreateStore, and useStore", () => {
    const firstName = "Jonathan";

    const MyNameDisplay = () => {
      const testStore = useStore(TestStore);
      return <div>{testStore.name}</div>;
    };

    const TestComponent = () => {
      const Provider = useProvider(TestStore);
      const testStore = useCreateStore(TestStore, {
        name: firstName,
      });
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    };

    const container = makeContainer(<TestComponent />);
    expect(container).toHaveTextContent(firstName);
  });

  test("observability is retained, and updates are reflected in the UI", () => {
    const firstName = "Jonathan";
    const lastName = "Newman";

    const MyNameDisplay = observer(() => {
      const store = useStore(TestStore);
      return (
        <div onClick={() => store.setName(lastName)} data-testid="name">
          {store.name}
        </div>
      );
    });

    const TestComponent = () => {
      const Provider = useProvider(TestStore);
      const testStore = useCreateStore(TestStore, { name: firstName });
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    };

    const container = makeContainer(<TestComponent />);
    expect(container).toHaveTextContent(firstName);
    fireEvent.click(getByTestId(container, "name"));
    expect(container).toHaveTextContent(lastName);
  });
});
