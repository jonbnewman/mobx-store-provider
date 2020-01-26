import { getByTestId, fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { observer } from "mobx-react";
import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { types } from "mobx-state-tree";
import { createProvider, createStore, useStore, disposeStore } from "./index";

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
    const Provider = createProvider();
    const firstName = "Jonathan";

    const MyNameDisplay = () => {
      return <div>{useStore().name}</div>;
    };

    const TestComponent = () => {
      const testStore = createStore(() => TestStore.create({ name: firstName }));
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    };

    const container = makeContainer(<TestComponent />);
    expect(container).toHaveTextContent(firstName);
  });

  test("can render updates into the UI", () => {
    const Provider = createProvider();
    const firstName = "Jonathan";
    const lastName = "Newman";

    const MyNameDisplay = observer(() => {
      const store = useStore();
      return (
        <div onClick={() => store.setName(lastName)} data-testid="name">
          {store.name}
        </div>
      );
    });

    const TestComponent = () => {
      const testStore = createStore(() => TestStore.create({ name: firstName }));
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

  test("can use a storeIdentifier to decouple Provider and useStore", () => {
    const firstName = "Jonathan";
    const lastName = "Newman";

    const storeIdentifier = "my-store";

    const MyNameDisplay = observer(() => {
      const store = useStore(storeIdentifier);
      return (
        <div onClick={() => store.setName(lastName)} data-testid="name">
          {store.name}
        </div>
      );
    });

    const Provider = createProvider(storeIdentifier);
    const TestComponent = () => {
      const testStore = createStore(() => TestStore.create({ name: firstName }));
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

  test("can retrieve the same store with an identifier", () => {
    const storeIdentifier = "some really cool store";

    const FirstProvider = createProvider(storeIdentifier);
    const SecondProvider = createProvider(storeIdentifier);

    expect(FirstProvider).toBe(SecondProvider);
  });

  test("can dispose a StoreProvider", () => {
    const storeIdentifier = "my-destructable-store";

    const FirstProvider = createProvider(storeIdentifier);

    disposeStore(storeIdentifier);

    const SecondProvider = createProvider(storeIdentifier);

    expect(FirstProvider).not.toBe(SecondProvider);
  });

  test("can use something other than a string as an identifier for a StoreProvider", () => {
    const storeIdentifier = function() {
      console.info("You will never see this. Wait, did you just read that?");
    };

    const FirstProvider = createProvider(storeIdentifier);
    const SecondProvider = createProvider(storeIdentifier);

    expect(FirstProvider).toBe(SecondProvider);
  });
});
