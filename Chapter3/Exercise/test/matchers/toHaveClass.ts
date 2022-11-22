import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toHaveClass = (
  received: { className: string },
  expectedClassName: string
) => {
  const pass = received.className.includes(expectedClassName);

  const sourceHint = () =>
    matcherHint("toHaveClass", "element", printExpected(expectedClassName), {
      isNot: pass,
    });

  const actualTextHint = () =>
    received.className === ""
      ? "Actual classes: " + printReceived([])
      : "Actual classes: " + printReceived(received.className.split(" "));

  const message = () => [sourceHint(), actualTextHint()].join("\n\n");

  return {
    pass,
    message,
  };
};
