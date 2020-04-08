import React from "react";
import "mobx-react-lite/batchingForReactDom";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, createStore, useStore } from "../";
import { TestStore, ITestStore, makeContainer } from "./integration.test";

describe("useProvider", () => {
  afterEach(cleanup);

  test("with no parameters", () => {
    const firstName = "Jonathan";

    function MyNameDisplay() {
      const testStore: ITestStore = useStore();
      return <div>{testStore.name}</div>;
    }

    function TestComponent() {
      const Provider = useProvider();
      const testStore: ITestStore = createStore(() =>
        TestStore.create({ name: firstName }),
      );
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    }

    expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
  });

  test("with an identifier", () => {
    const identifier = "identifier";
    const firstName = "Jonathan";

    function MyNameDisplay() {
      const testStore: ITestStore = useStore(identifier);
      return <div>{testStore.name}</div>;
    }

    function TestComponent() {
      const Provider = useProvider(identifier);
      const testStore: ITestStore = createStore(() =>
        TestStore.create({ name: firstName }),
      );
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    }

    expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
  });
});
