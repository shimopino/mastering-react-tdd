/**
 * 関数の中で暗黙的にコンテナ変数を更新することで、読み取り専用の定数のように使用する
 */
export let container: Element;
export const initializeReactContainer = () => {
  container = document.createElement("div");
  // 特定のDOMイベントが、要素がドキュメントツリーの一部である場合にのみ
  // 登録されるため、Documentに生成したDOMを所属させる
  document.body.replaceChildren(container);
};
