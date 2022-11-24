import React from "react";
import { form, initializeReactContainer, render } from "./reactTestExtensions";
import { CustomForm } from "../src/CustomForm";

describe("CustomForm", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const blankCustomer = {
    firstName: "",
  };

  it("renders a form", () => {
    render(<CustomForm original={blankCustomer} />);

    expect(form()).not.toBeNull();
  });

  it("renders the first name field as a text box", () => {
    render(<CustomForm original={blankCustomer} />);

    // @ts-expect-error 最終的にラベルでの取得に変更する
    const field = (form() as HTMLFormElement).elements.firstName;
    expect(field).not.toBeNull();
    expect(field.tagName).toEqual("INPUT");
    expect(field.type).toEqual("text");
  });

  it("includes the existing value for the first time", () => {
    const customer = { firstName: "Ashley" };
    render(<CustomForm original={customer} />);

    // @ts-expect-error 最終的にラベルでの取得に変更する
    const field = (form() as HTMLFormElement).elements.firstName;
    expect(field.value).toEqual("Ashley");
  });
});
