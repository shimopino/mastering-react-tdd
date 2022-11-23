import React from "react";
import { form, initializeReactContainer, render } from "./reactTestExtensions";
import { CustomForm } from "../src/CustomForm";

describe("CustomForm", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<CustomForm />);

    expect(form()).not.toBeNull();
  });
});
