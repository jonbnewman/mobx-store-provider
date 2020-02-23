import React from "react";
import { types } from "mobx-state-tree";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, createStore } from "../index";

const TestStore = types
  .model({
    name: types.optional(types.string, "TestStore"),
  })
  .actions(self => ({
    setName(name: string) {
      self.name = name;
    },
  }));

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

  test("can receive the same store Provider for the same identifier", () => {
    const providers = new Map();
    const identifier = "my-store";

    function TestComponent() {
      const Provider = useProvider(identifier);
      providers.set(providers.has("first") ? "second" : "first", Provider);
      return <Provider value={createStore(() => TestStore.create())} />;
    }

    makeContainer(<TestComponent />);
    makeContainer(<TestComponent />);

    expect(providers.get("first")).toBe(providers.get("second"));
  });
});
