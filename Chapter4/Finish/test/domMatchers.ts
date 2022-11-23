import { toContainText } from "./matchers/toContainText";
import { toHaveClass } from "./matchers/toHaveClass";

// package.jsonの設定が効いていなかったため、直接指定する
// @ts-expect-error React用の設定
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

/**
 * やり方は下記の公式ページを参照したほうがいいかも
 * https://jestjs.io/ja/docs/expect#expectextendmatchers
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toContainText(expected: string): R;
      toHaveClass(expected: string): R;
    }
  }
}

expect.extend({
  toContainText,
  toHaveClass,
});
