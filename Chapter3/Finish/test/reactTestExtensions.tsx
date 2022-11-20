import { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

/**
 * 関数の中で暗黙的にコンテナ変数を更新することで、読み取り専用の定数のように使用する
 */
let container: Element;
export const initializeReactContainer = () => {
  container = document.createElement("div");
  // 特定のDOMイベントが、要素がドキュメントツリーの一部である場合にのみ
  // 登録されるため、Documentに生成したDOMを所属させる
  document.body.replaceChildren(container);
};

export const render = (component: ReactNode) => {
  // React18から render 関数は非同期になっているため、
  // DOMを修正する前にテストが終了してしまわないように
  // 非同期レンダリングが完了するまで一時停止するヘルパー関数を実行
  act(() => {
    createRoot(container).render(component);
  });
};
