import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Appointment, AppointmentsDayView } from "../src/Appointment";

// package.jsonの設定が効いていなかったため、直接指定する
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("Appointment", () => {
  let container;

  const render = (component) => {
    // React18から render 関数は非同期になっているため、
    // DOMを修正する前にテストが終了してしまわないように
    // 非同期レンダリングが完了するまで一時停止するヘルパー関数を実行
    act(() => {
      ReactDOM.createRoot(container).render(component);
    });
  };

  beforeEach(() => {
    container = document.createElement("div");
    // 特定のDOMイベントが、要素がドキュメントツリーの一部である場合にのみ
    // 登録されるため、Documentに生成したDOMを所属させる
    document.body.replaceChildren(container);
  });

  it("renders the customer first name", () => {
    // 期待する実行方法を用意する
    // ここでコンポーネントができていなくても問題なし
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);

    expect(document.body.textContent).toContain("Ashley");
  });

  it("render another customer first name", () => {
    const customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);

    expect(document.body.textContent).toContain("Jordan");
  });
});

describe("AppointmentDaysView", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) => {
    act(() => {
      ReactDOM.createRoot(container).render(component);
    });
  };

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });
});
