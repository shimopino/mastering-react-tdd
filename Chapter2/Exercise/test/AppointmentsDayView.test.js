import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";

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
  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];

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

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);

    const listElement = document.querySelector("ol");
    expect(listElement).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const listChildren = document.querySelectorAll("li");
    expect(listChildren[0].textContent).toEqual("12:00");
    expect(listChildren[1].textContent).toEqual("13:00");
  });

  it("initially shows a message saying there no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default with firstName", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(document.body.textContent).toContain("Ashley");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const button = document.querySelectorAll("button")[1];
    act(() => button.click());
    expect(document.body.textContent).toContain("Jordan");
  });
});
