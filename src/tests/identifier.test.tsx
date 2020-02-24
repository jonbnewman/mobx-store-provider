import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, createStore } from "../";
import { TestStore, ITestStore, makeContainer } from "./integration.test";

describe("identifier", () => {
  afterEach(cleanup);

  interface TestComponentInterface {
    identifier: string;
  }

  test("return the same store for the same identifier", () => {
    const stores = new Map();
    const identifier = "my-store";

    function TestComponent() {
      const Provider = useProvider(identifier);
      const testStore: ITestStore = createStore(() => TestStore.create());
      stores.set(stores.has("first") ? "second" : "first", testStore);
      return <Provider value={testStore} />;
    }

    makeContainer(<TestComponent />);
    makeContainer(<TestComponent />);

    expect(stores.get("first")).toStrictEqual(stores.get("second"));
  });

  test("return a different store for a different identifier", () => {
    const stores = new Map();
    const firstId = "my-store";
    const secondId = "my-other-store";

    function TestComponent({ identifier }: TestComponentInterface) {
      const Provider = useProvider(identifier);
      const testStore: ITestStore = createStore(() => TestStore.create());
      stores.set(stores.has("first") ? "second" : "first", testStore);
      return <Provider value={testStore} />;
    }

    makeContainer(<TestComponent identifier={firstId} />);
    makeContainer(<TestComponent identifier={secondId} />);

    expect(stores.get("first")).not.toBe(stores.get("second"));
  });

  test("return a different store for default vs a specified identifier", () => {
    const stores = new Map();
    const secondId = "my-other-store";

    function DefaultTestComponent() {
      const Provider = useProvider();
      const testStore: ITestStore = createStore(() => TestStore.create());
      stores.set(stores.has("first") ? "second" : "first", testStore);
      return <Provider value={testStore} />;
    }

    function TestComponent({ identifier }: TestComponentInterface) {
      const Provider = useProvider(identifier);
      const testStore: ITestStore = createStore(() => TestStore.create());
      stores.set(stores.has("first") ? "second" : "first", testStore);
      return <Provider value={testStore} />;
    }

    makeContainer(<DefaultTestComponent />);
    makeContainer(<TestComponent identifier={secondId} />);

    expect(stores.get("first")).not.toBe(stores.get("second"));
  });
});
