import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toContainText = (
  received: { textContent: string },
  expectedText: string
) => {
  const pass = received.textContent.includes(expectedText);
  const sourceHint = () => {
    return matcherHint(
      "toContainText",
      "element",
      printExpected(expectedText),
      { isNot: pass }
    );
  };

  const actualTextHint = () =>
    `Actual text: ${printReceived(received.textContent)}`;

  const message = () => {
    return [sourceHint(), actualTextHint()].join("\n\n");
  };

  return {
    pass,
    message,
  };
};
