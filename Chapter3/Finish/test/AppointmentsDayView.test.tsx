import React from "react";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";
import { render, initializeReactContainer, click } from "./reactTestExtensions";

// package.jsonの設定が効いていなかったため、直接指定する
// @ts-expect-error React用の設定
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("Appointment", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders the customer first name", () => {
    // 期待する実行方法を用意する
    // ここでコンポーネントができていなくても問題なし
    const customer = { firstName: "Ashley" };
    // @ts-expect-error 型エラーを無視
    render(<Appointment customer={customer} />);

    expect(document.body).toContainText("Ashley");
  });

  it("render another customer first name", () => {
    const customer = { firstName: "Jordan" };
    // @ts-expect-error 型エラーを無視
    render(<Appointment customer={customer} />);

    expect(document.body).toContainText("Jordan");
  });
});

describe("AppointmentDaysView", () => {
  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];

  beforeEach(() => {
    initializeReactContainer();
  });

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
    // @ts-expect-error 型エラーを無視
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    // @ts-expect-error 型エラーを無視
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const listChildren = document.querySelectorAll("li");
    expect(listChildren[0]).toContainText("12:00");
    expect(listChildren[1]).toContainText("13:00");
  });

  it("initially shows a message saying there no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.body).toContainText(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default with firstName", () => {
    // @ts-expect-error 型エラーを無視
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(document.body).toContainText("Ashley");
  });

  it("has a button element in each li", () => {
    // @ts-expect-error 型エラーを無視
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect((buttons[0] as HTMLButtonElement).type).toEqual("button");
  });

  it("renders another appointment when selected", () => {
    // @ts-expect-error 型エラーを無視
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const button = document.querySelectorAll("button")[1];
    click(button);
    expect(document.body).toContainText("Jordan");
  });
});
