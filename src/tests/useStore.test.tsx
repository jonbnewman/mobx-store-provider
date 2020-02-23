import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, createStore, useStore } from "../";
import { TestStore, ITestStore, makeContainer } from "./tooling";

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
});
