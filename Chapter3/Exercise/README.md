# 第 3 章

## この章でやること

テストの中で再利用可能なものを抽出し、Jest のカスタム Matcher を使用してテストスイートを保守性の高いものにしていく。

## 得られたこと

テストコードの中で発生した重複を削除したり、 `document` や `textContent` などの DOM 要素への依存を極力無くし、モジュール化させたり関数化させたりすることで、1 つ 1 つのテストの目的をはっきりさせることができる。

後からテストを見返した時に事前準備・実行・検証の構造がより把握しやすい。

## Jest Custom Matcher

Jest の公式ページにも `TypeScript` で実践する具体例が記載されている。

| options | 概要                                            |
| :------ | :---------------------------------------------- |
| isNot   | 正しいマッチャのヒントを表示するための文字列    |
| equals  | 再帰的に同じ値を持つ場合に `true` を返す関数    |
| expand  | extend オプション付きで呼ばれたかどうかがわかる |
| promise | 再帰的に同じ値を持つ場合に `true` を返す関数    |

[expect.extend](https://jestjs.io/ja/docs/expect#expectextendmatchers)

## 補足 (TypeScript や ESLint などの導入)
