# 第 1 章

この章ではサンプルアプリケーションの環境を 0 から構築していくため、 `create-react-app` などのツールを使用せずに、インストールから 1 つ 1 つ実施していく。

## 得られたこと

この章を通して学んだことは下記の観点である。

- TDD の三角測量を使用して、異なる事例に対して同一のコンポーネントをテストした
  - その結果、重複している箇所を共通化させ、それぞれのテストが検証した内容に焦点を当てることができた
  - 自然と `Arrange, Act, Assert` の形式になっている
- 重複を避ける上で下記の設計原則が役に立った
  - `YAGNI`
  - `DRY`

## さらに

### act 関数とは何か

React18 から `render` 関数は非同期処理になっているため、 `act` 関数を使用せずにテストしようとすると、下記のように明示的に非同期処理が完了するのを待機させる必要がある。

```ts
it("renders name (without act)", async () => {
  global.IS_REACT_ACT_ENVIRONMENT = false; // not always necessary, see below
  const container = document.createElement("div");
  ReactDOM.createRoot(container).render(<Customer name="Ashley" />);
  await new Promise(setTimeout);
  expect(container.textContent).toContain("Ashley");
});
```

ここで `act` でラップすることで全てを同期的に実行することが可能となる。

[Understanding act](https://reacttdd.com/understanding-act)

### let キーワードをいつ使用するか

テストの中でも `let` を使って毎回のテストで初期化するようにしておけば、各テストで毎回設定するハッピーパスの設定を除外して、異常系のテストだけでスパイを挟み込むことも可能となる。

```ts
describe("MyComponent", () => {
  let myDependency

  beforeEach(() => {
    myDependency = jest.fn(); // ハッピーパスの設定
  })

　it("異常系", () => {
    myDependency = // 異常系の設定
  })
})
```

[When to use the let keyword](https://reacttdd.com/use-of-let)

### Babel の全体像

Babel は大きく分けて以下のような処理を行なっている。

1. Parse
   - ソースコードを AST に変換する
2. Transformation
   - AST から AST に変換する
3. Generator
   - 変換された AST からソースコードに変換する

Babel では変換の際に関数などのよく使われる関数に対して都度都度ヘルパー関数を生成するが、ここで使用している `@babel/plugin-transform-runtime` をしようすることで、ヘルパーが必要なファイルでヘルパー関数を定義するのではなく、 `@babel/runtime` の関数を参照するように設定できる。

その他にも使用している `preset` とは、Babel が変換処理を行う際に使用するプラグインの集合である。

- `@babel/preset-env`
  - 出力したい ECMAScript のバージョンを設定するためのプリセット
  - サポートしたい範囲を指定すれば、内容に応じた適切なバージョンの JS に変換する
- `@babel/preset-react`
  - JSX などの構文を JS に変換する
