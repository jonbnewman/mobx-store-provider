import { getByTestId, fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { observer } from "mobx-react";
import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { types } from "mobx-state-tree";
import StoreProvider, { createStore } from "./index";

const TestStore = types
  .model({
    name: types.string,
  })
  .actions(self => ({
    setName(name: string) {
      self.name = name;
    },
  }));

function makeContainer(contents: any) {
  return render(contents).container;
}

describe("mobx-store-provider", () => {
  test("can provide a created store", () => {
    const { Provider, useStore } = StoreProvider();
    const name = "Jonathan";

    const MyNameDisplay = () => {
      return <div>{useStore().name}</div>;
    };

    const TestComponent = () => {
      const testStore = createStore(() => TestStore.create({ name }));
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    };

    const container = makeContainer(<TestComponent />);
    expect(container).toHaveTextContent(name);
  });

  test("can render updates into the UI", () => {
    const { Provider, useStore } = StoreProvider();
    const name = "Jonathan";
    const nextName = "Newman";

    const MyNameDisplay = observer(() => {
      const store = useStore();
      return (
        <div onClick={() => store.setName(nextName)} data-testid="name">
          {store.name}
        </div>
      );
    });

    const TestComponent = () => {
      const testStore = createStore(() => TestStore.create({ name }));
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    };

    const container = makeContainer(<TestComponent />);
    expect(container).toHaveTextContent(name);

    fireEvent.click(getByTestId(container, "name"));
    expect(container).toHaveTextContent(nextName);
  });
});
