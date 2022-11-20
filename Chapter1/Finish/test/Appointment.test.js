import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Appointment } from "../src/Appointment";

// package.jsonの設定が効いていなかったため、直接指定する
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("Appointment", () => {
  it("renders the customer first name", () => {
    // 期待する実行方法を用意する
    // ここでコンポーネントができていなくても問題なし
    const customer = { firstName: "Ashley" };
    const component = <Appointment customer={customer} />;
    const container = document.createElement("div");
    // 特定のDOMイベントが、要素がドキュメントツリーの一部である場合にのみ
    // 登録されるため、Documentに生成したDOMを所属させる
    document.body.replaceChildren(container);

    // React18から render 関数は非同期になっているため、
    // DOMを修正する前にテストが終了してしまわないように
    // 非同期レンダリングが完了するまで一時停止するヘルパー関数を実行
    act(() => {
      ReactDOM.createRoot(container).render(component);
    });

    expect(document.body.textContent).toContain("Ashley");
  });

  it("render another customer first name", () => {
    const customer = { firstName: "Jordan" };
    const component = <Appointment customer={customer} />;
    const container = document.createElement("div");
    document.body.replaceChildren(container);

    act(() => {
      ReactDOM.createRoot(container).render(component);
    });

    expect(document.body.textContent).toContain("Jordan");
  });
});
