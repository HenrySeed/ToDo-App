/**
 * Stores a List made up of a done list and a to-do list.
 * Can delete, edit, check and uncheck items
 * @class TodoList
 */
class TodoList {
    todoItems;
    doneItems;
    name;
    cursorPos;

    constructor(name) {
        this.name = name || "";
        this.cursorPos = 0;
        this.todoItems = [];
        this.doneItems = [];
    }

    setCursor(index) {
        this.cursorPos = index;
    }

    /**
     * Unchecks an item given by its index from the todolist
     * @param {*} listIndex
     * @memberof TodoList
     */
    uncheck(listIndex, renderFunc) {
        const item = this.doneItems.splice(listIndex, 1);
        this.todoItems.push(item);
        renderFunc();
    }

    /**
     * Checks an item given by its index from the todolist
     * @param {*} listIndex
     * @memberof TodoList
     */
    check(listIndex, renderFunc) {
        const item = this.todoItems.splice(listIndex, 1);
        this.doneItems.push(item);
        renderFunc();
    }

    /**
     * Edits the current index item
     * @param {*} listIndex
     * @memberof TodoList
     */
    editItem() {
        editedItem = this.deleteItem(this.cursorPos);
        document.getElementById("newTodoTextBox").value = editedItem;
    }

    /**
     * Removes the given item from its respective list
     * @param {*} listIndex
     * @returns
     * @memberof TodoList
     */
    deleteItem() {
        let _ret;
        if (this.cursorPos > 0) {
            if (this.cursorPos - 1 < this.todoItems.length) {
                let itemIndex = this.cursorPos - 1;
                _ret = this.todoItems.splice(itemIndex, 1);
            } else {
                let itemIndex = this.cursorPos - (this.todoItems.length + 1);
                _ret = this.doneItems.splice(itemIndex, 1);
            }
            if (cursorPos > this.todoItems.length + this.doneItems.length) {
                cursorPos -= 1;
            }
        }
        return _ret;
    }
}
