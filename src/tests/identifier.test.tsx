import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, useCreateStore, useStore } from "../";
import { TestStore, makeContainer } from "./integration.test";

describe("identifier", () => {
  afterEach(cleanup);

  interface TestComponentInterface {
    identifier: string;
    children: any;
  }

  test("return the same store for the same model", () => {
    const stores = new Map();

    function TestComponent() {
      const Provider = useProvider(TestStore);
      const testStore = useCreateStore(TestStore);
      stores.set(stores.has("first") ? "second" : "first", testStore);
      return <Provider value={testStore} />;
    }

    makeContainer(<TestComponent />);
    makeContainer(<TestComponent />);

    expect(stores.get("first")).toStrictEqual(stores.get("second"));
  });

  test("return a different store for a different identifier", () => {
    const firstId = "my-store";
    const secondId = "my-other-store";

    function TestComponent({ identifier }: TestComponentInterface) {
      const Provider = useProvider(TestStore, identifier);
      const testStore = useCreateStore(TestStore);
      return <Provider value={testStore} />;
    }

    function CheckStores() {
      const firstStore = useStore(TestStore, firstId);
      const secondStore = useStore(TestStore, secondId);
      expect(firstStore).not.toBe(secondStore);
      return null;
    }

    makeContainer(
      <TestComponent identifier={firstId}>
        <TestComponent identifier={secondId}>
          <CheckStores />
        </TestComponent>
      </TestComponent>,
    );
  });
});
