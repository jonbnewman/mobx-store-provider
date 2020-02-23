import { types, Instance } from "mobx-state-tree";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const TestStore = types.model({
  name: types.optional(types.string, "TestStore"),
});

interface ITestStore extends Instance<typeof TestStore> {}

function makeContainer(contents: any) {
  return render(contents).container;
}

export { TestStore, ITestStore, makeContainer };
