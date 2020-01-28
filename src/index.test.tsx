import React from "react";
import { types } from "mobx-state-tree";
import { observer } from "mobx-react";
import { getByTestId, fireEvent } from "@testing-library/dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, createStore, useStore } from "./index";

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
  describe("smoke tests", () => {
    test("can provide a created store using useProvider, createStore, and useStore", () => {
      const firstName = "Jonathan";

      const MyNameDisplay = () => <div>{useStore().name}</div>;
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
    });

    test("observability is retained, and updates are reflected in the UI", () => {
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

  describe("identifiers", () => {
    test("can retrieve the same store Provider with an identifier", () => {
      const storeIdentifier = Symbol("identifier");
      const FirstProvider = useProvider(storeIdentifier);
      const SecondProvider = useProvider(storeIdentifier);
      expect(FirstProvider).toBe(SecondProvider);

      const DifferentProvider = useProvider("something else");
      expect(DifferentProvider).not.toBe(FirstProvider);

      const DefaultProvider = useProvider();
      expect(DefaultProvider).not.toBe(FirstProvider);
      expect(DefaultProvider).not.toBe(DifferentProvider);
    });

    test("can dispose a store and receive a different store for the same identifier", () => {
      const stores = new Map();
      let name: string;

      const MyNameDisplay = () => <div>{useStore().name}</div>;
      const TestComponent = () => {
        const Provider = useProvider();
        const testStore = createStore(() => TestStore.create({ name }));
        stores.set(name, testStore);
        return (
          <Provider value={testStore}>
            <MyNameDisplay />
          </Provider>
        );
      };

      name = "first";
      makeContainer(<TestComponent />);
      cleanup();
      name = "second";
      makeContainer(<TestComponent />);
      cleanup();

      expect(stores.get("first")).not.toBe(stores.get("second"));
    });

    test("can use a function as an identifier for a store", () => {
      const storeIdentifier = function() {
        throw "You will never see this. Wait, did you just read that?";
      };
      const FirstProvider = useProvider(storeIdentifier);
      const SecondProvider = useProvider(storeIdentifier);
      expect(FirstProvider).toBe(SecondProvider);
    });
  });

  describe("features", () => {
    test("can use a mapStateToProps selector", () => {
      const firstName = "Jonathan";
      const storeIdentifier = "map-state-to-props-test";

      function selectName(store: any) {
        return store.name;
      }

      const MyNameDisplay = () => (
        <div>{useStore(storeIdentifier, selectName)}</div>
      );
      const TestComponent = () => {
        const Provider = useProvider(storeIdentifier);
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
    });
  });
});
