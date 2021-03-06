import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, useCreateStore, useStore } from "../";
import { TestStore, makeContainer } from "./integration.test";

describe("useStore", () => {
  afterEach(cleanup);

  test("with no identifier", () => {
    const firstName = "Jonathan";

    function MyNameDisplay() {
      const testStore = useStore(TestStore);
      return <div>{testStore.name}</div>;
    }

    function TestComponent() {
      const Provider = useProvider(TestStore);
      const testStore = useCreateStore(TestStore, {
        name: firstName,
      });
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
      const testStore = useStore(TestStore, identifier);
      return <div>{testStore.name}</div>;
    }

    function TestComponent() {
      const Provider = useProvider(TestStore, identifier);
      const testStore = useCreateStore(TestStore, { name: firstName });
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    }

    expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
  });
});
