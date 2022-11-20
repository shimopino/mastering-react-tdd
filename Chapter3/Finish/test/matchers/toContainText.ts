export const toContainText = (
  received: { textContent: string },
  expectedText: string
) => {
  return {
    pass: received.textContent.includes(expectedText),
  };
};
