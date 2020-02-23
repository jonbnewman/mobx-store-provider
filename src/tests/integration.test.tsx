import React from "react";
import { types, Instance } from "mobx-state-tree";
import { observer } from "mobx-react";
import { getByTestId, fireEvent } from "@testing-library/dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, createStore, useStore } from "../index";

const TestStore = types
  .model({
    name: types.optional(types.string, "TestStore"),
  })
  .actions(self => ({
    setName(name: string) {
      self.name = name;
    },
  }));

interface ITestStore extends Instance<typeof TestStore> {}

function makeContainer(contents: any) {
  return render(contents).container;
}

describe("integration", () => {
  afterEach(cleanup);

  test("can provide a created store using useProvider, createStore, and useStore", () => {
    const firstName = "Jonathan";

    const MyNameDisplay = () => <div>{useStore().name}</div>;
    const TestComponent = () => {
      const Provider = useProvider();
      const testStore: ITestStore = createStore(() =>
        TestStore.create({ name: firstName }),
      );
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
      const store: ITestStore = useStore();
      return (
        <div onClick={() => store.setName(lastName)} data-testid="name">
          {store.name}
        </div>
      );
    });

    const TestComponent = () => {
      const Provider = useProvider();
      const testStore = createStore(() =>
        TestStore.create({ name: firstName }),
      );
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
