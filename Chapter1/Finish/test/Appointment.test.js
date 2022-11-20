import React from "react";
import ReactDOM from "react-dom";

describe("Appointment", () => {
  it("renders the customer first name", () => {
    // 期待する実行方法を用意する
    // ここでコンポーネントができていなくても問題なし
    const customer = { firstName: "Ashley" };
    const component = <Appointment customer={customer} />;
    const container = document.createElement("div");
    // 特定のDOMイベントが、要素がドキュメントツリーの一部である場合にのみ
    // 登録されるため、Documentに生成したDOMを所属させる
    document.body.appendChild(container);
    ReactDOM.createRoot(container).render(component);

    expect(document.body.textContent).toContain("Ashley");
  });
});
