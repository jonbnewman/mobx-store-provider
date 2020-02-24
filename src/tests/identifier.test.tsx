import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, createStore } from "../";
import { TestStore, ITestStore, makeContainer } from "./integration.test";

describe("identifier", () => {
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

  test("can receive the same store Provider for the same identifier", () => {
    const providers = new Map();
    const identifier = "my-store";

    function TestComponent() {
      const Provider = useProvider(identifier);
      const testStore: ITestStore = createStore(() => TestStore.create());
      providers.set(providers.has("first") ? "second" : "first", Provider);
      return <Provider value={testStore} />;
    }

    makeContainer(<TestComponent />);
    makeContainer(<TestComponent />);

    expect(providers.get("first")).toBe(providers.get("second"));
  });
});
