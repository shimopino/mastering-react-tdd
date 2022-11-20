import { matcherHint, printExpected } from "jest-matcher-utils";

export const toContainText = (
  received: { textContent: string },
  expectedText: string
) => {
  const pass = received.textContent.includes(expectedText);

  const message = () => {
    return matcherHint(
      "toContainText",
      "element",
      printExpected(expectedText),
      { isNot: pass }
    );
  };

  return {
    pass,
    message,
  };
};
