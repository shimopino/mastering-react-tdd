import { toContainText } from "./matchers/toContainText";

/**
 * やり方は下記の公式ページを参照したほうがいいかも
 * https://jestjs.io/ja/docs/expect#expectextendmatchers
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toContainText(expected: string): R;
    }
  }
}

expect.extend({
  toContainText,
});
