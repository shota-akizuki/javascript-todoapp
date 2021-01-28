import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  constructor(items = []) {
    super();
    this.items = items;
  }
  /**
   * TodoItemの合計個数を返す
   * @returns {number}
   */
  getTotalCount() {
    return this.items.length;
  }
  getTodoItems() {
    return this.items;
  }
  /**
   * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener("change", listener);
  }
  /**
   * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
   */

  emitChange() {
    this.emit("change");
  }
  /**
   * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
   */
  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }
}
