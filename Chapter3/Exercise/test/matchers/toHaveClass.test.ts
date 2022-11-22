import { toHaveClass } from "./toHaveClass";

const stripTerminalColor = (text: string) => text.replace(/\x1B\[\d+m/g, "");

describe("toHaveClass matcher", () => {
  it("returns a pass true when dom have expected className", () => {
    const domElement = {
      className: "target",
    };

    const result = toHaveClass(domElement, "target");

    expect(result.pass).toBe(true);
  });

  it("returns a pass false when dom not have expected className", () => {
    const domElement = {
      className: "",
    };

    const result = toHaveClass(domElement, "target");

    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if no match", () => {
    const domElement = { className: "" };
    const result = toHaveClass(domElement, "class1");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).toHaveClass("class1")`
    );
  });

  it("returns a message tha contain the source line if negated match", () => {
    const domElement = {
      className: "target",
    };

    const result = toHaveClass(domElement, "target");

    expect(result.pass).toBe(true);
    expect(stripTerminalColor(result.message())).toContain(
      'expect(element).not.toHaveClass("target")'
    );
  });

  it("returns a message that contains the actual text", () => {
    const domElement = { className: "class1" };
    const result = toHaveClass(domElement, "class1");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual classes: ["class1"]`
    );
  });

  it("retunrs a message with empty array if there are no classes", () => {
    const domElement = { className: "" };
    const result = toHaveClass(domElement, "class1");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual classes: []`
    );
  });

  it("retunrs a message with multiple element if there are no classes", () => {
    const domElement = { className: "class1 class2" };
    const result = toHaveClass(domElement, "class2");

    expect(result.pass).toBe(true);
    expect(stripTerminalColor(result.message())).toContain(
      `Actual classes: ["class1", "class2"]`
    );
  });
});
