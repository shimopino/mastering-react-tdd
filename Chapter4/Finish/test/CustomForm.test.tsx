import React from "react";
import {
  element,
  initializeReactContainer,
  render,
} from "./reactTestExtensions";
import { CustomForm } from "../src/CustomForm";

describe("CustomForm", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<CustomForm />);

    expect(element("form")).not.toBeNull();
  });
});
