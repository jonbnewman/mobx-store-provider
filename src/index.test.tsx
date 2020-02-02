import React from "react";
import { types, Instance } from "mobx-state-tree";
import { observer } from "mobx-react";
import { getByTestId, fireEvent } from "@testing-library/dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, createStore, useStore } from "./index";

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

describe("store identifiers", () => {
  afterEach(cleanup);

  test("can use store identifiers", () => {
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

  test("can receive the same store Provider for the same identifier when disposal has not occured", () => {
    const providers = new Map();
    const identifier = "my-store";

    function TestComponent() {
      const Provider = useProvider(identifier);
      providers.set(providers.has("first") ? "second" : "first", Provider);
      return (
        <Provider value={createStore(identifier, () => TestStore.create())} />
      );
    }

    makeContainer(<TestComponent />);
    makeContainer(<TestComponent />);

    expect(providers.get("first")).toBe(providers.get("second"));
  });

  test("can dispose a store and receive a different store Provider for the same identifier", () => {
    const providers = new Map();
    const identifier = "my-store";

    function TestComponent() {
      const Provider = useProvider(identifier);
      providers.set(providers.has("first") ? "second" : "first", Provider);
      return (
        <Provider value={createStore(identifier, () => TestStore.create())} />
      );
    }

    makeContainer(<TestComponent />);
    cleanup();
    makeContainer(<TestComponent />);

    expect(providers.get("first")).not.toBe(providers.get("second"));
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

describe("integration tests", () => {
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

describe("hooks api", () => {
  describe("useStore", () => {
    afterEach(cleanup);

    test("with no parameters", () => {
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
      expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
    });

    test("with an identifier", () => {
      const identifier = "identifier";
      const firstName = "Jonathan";
      const MyNameDisplay = () => <div>{useStore(identifier).name}</div>;
      const TestComponent = () => {
        const Provider = useProvider(identifier);
        const testStore = createStore(identifier, () =>
          TestStore.create({ name: firstName }),
        );
        return (
          <Provider value={testStore}>
            <MyNameDisplay />
          </Provider>
        );
      };
      expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
    });

    test("with a mapStateToProps callback", () => {
      const firstName = "Jonathan";
      function selectName(store: ITestStore) {
        return store.name;
      }
      const MyNameDisplay = () => <div>{useStore(selectName)}</div>;
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
      expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
    });

    test("with an identifier and a mapStateToProps callback", () => {
      const identifier = "identifier";
      const firstName = "Jonathan";
      function selectName(store: ITestStore) {
        return store.name;
      }
      const MyNameDisplay = () => <div>{useStore(identifier, selectName)}</div>;
      const TestComponent = () => {
        const Provider = useProvider(identifier);
        const testStore = createStore(identifier, () =>
          TestStore.create({ name: firstName }),
        );
        return (
          <Provider value={testStore}>
            <MyNameDisplay />
          </Provider>
        );
      };
      expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
    });
  });

  describe("createStore", () => {
    afterEach(cleanup);

    test("with a factory only", () => {
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
      expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
    });

    test("with an identifier and a factory", () => {
      const identifier = "identifier";
      const firstName = "Jonathan";
      const MyNameDisplay = () => <div>{useStore(identifier).name}</div>;
      const TestComponent = () => {
        const Provider = useProvider(identifier);
        const testStore = createStore(identifier, () =>
          TestStore.create({ name: firstName }),
        );
        return (
          <Provider value={testStore}>
            <MyNameDisplay />
          </Provider>
        );
      };
      expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
    });
  });

  describe("useProvider", () => {
    afterEach(cleanup);

    test("with no parameters", () => {
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
      expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
    });

    test("with an identifier", () => {
      const identifier = "identifier";
      const firstName = "Jonathan";
      const MyNameDisplay = () => <div>{useStore(identifier).name}</div>;
      const TestComponent = () => {
        const Provider = useProvider(identifier);
        const testStore = createStore(identifier, () =>
          TestStore.create({ name: firstName }),
        );
        return (
          <Provider value={testStore}>
            <MyNameDisplay />
          </Provider>
        );
      };
      expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
    });
  });
});
