import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, createStore, useStore } from "../";
import { TestStore, ITestStore, makeContainer } from "./setup";

describe("useProvider", () => {
  afterEach(cleanup);

  test("with no parameters", () => {
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
    expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
  });

  test("with an identifier", () => {
    const identifier = "identifier";
    const firstName = "Jonathan";
    const MyNameDisplay = () => <div>{useStore(identifier).name}</div>;
    const TestComponent = () => {
      const Provider = useProvider(identifier);
      const testStore: ITestStore = createStore(() =>
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
