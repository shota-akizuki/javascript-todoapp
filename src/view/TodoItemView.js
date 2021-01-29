import { element } from "./html-util.js";

export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */

  createElement(todoItem, { onDeleteTodo, onUpdateTodo }) {
    // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
    // input要素にはcheckboxクラスをつける
    // 削除ボタン(x)をそれぞれ追加する
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked><s>${todoItem.title}</s>
    <button class="delete">x</button></li>`
      : element`<li><input type="checkbox" class="checkbox">${todoItem.title}
    <button class="delete">x</button></li>`;

    // チェックボックスがトグルしたときのイベントにリスナー関数を登録
    const inputCheckBoxElement = todoItemElement.querySelector(".checkbox");
    inputCheckBoxElement.addEventListener("change", () => {
      // 指定したTodoアイテムの完了状態を反転させる
      // コールバック関数に変更
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed,
      });
    });
    // 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する

    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      // コールバック関数に変更
      onDeleteTodo({ id: todoItem.id });
    });
    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}
