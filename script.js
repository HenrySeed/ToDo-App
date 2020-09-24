let todoTodo = new TodoList("To-Do");
todoTodo.todoItems = ["Eat a sandwiche", "learn to spell sandwihc"];
todoTodo.doneItems = ["Buy some Mozz", "Bake some Bread", "Grow some greens"];

let workTodo = new TodoList("Work");
workTodo.todoItems = ["Build that thing"];
workTodo.doneItems = ["Build that opther thing", "read slack"];

let weekendTodo = new TodoList("Weekend");
weekendTodo.todoItems = ["Sleep", "have a bev"];
weekendTodo.doneItems = ["Make some fresh memes"];

let tabs = [todoTodo, workTodo, weekendTodo];
let tabPos = 0;
let thisTab = tabs[tabPos];

function checkFinish(event) {
    if (event.key === "Enter") {
        const newTodo = document.getElementById("newTodoTextBox").value;
        thisTab.todoItems.push(newTodo);

        render();
        document.getElementById("newTodoTextBox").value = "";
    }
    document.getElementsByTagName("textarea")[0].style.height = "auto";
    document.getElementsByTagName("textarea")[0].style.height =
        this.scrollHeight + "px";
}

function changeTab(change) {
    tabPos += change;

    if (tabPos < 0) {
        tabPos = tabs.length - 1;
    } else if (tabPos > tabs.length - 1) {
        tabPos = 0;
    }
    thisTab = tabs[tabPos];
    render();
    focusTextBox();
}

function focusTextBox() {
    document.getElementById("newTodoTextBox").focus();
    thisTab.cursorPos = 0;
    render();
}

function check(index) {
    thisTab.check(index, render);
}
function uncheck(index) {
    thisTab.uncheck(index, render);
}

function render() {
    const todoListItems = [];
    const doneListItems = [];
    const tabItems = [];

    let index = 0;
    for (const tab of tabs) {
        if (index === tabPos) {
            tabItems.push(`<span class="selected">${tab.name}</span>`);
        } else {
            tabItems.push(`<span>${tab.name}</span>`);
        }
        index += 1;
    }

    index = 0;
    for (const todoitem of thisTab.todoItems) {
        if (index + 1 === thisTab.cursorPos) {
            todoListItems.push(
                `<li><span class="checkbox" onClick="check(${index}, render)">\
                    [<span class="check">█</span>]</span> <span class="todoText">${todoitem}</span>\
                </li>`
            );
        } else {
            todoListItems.push(
                `<li><span class="checkbox" onClick="check(${index}, render)">\
                    [ ]</span> <span class="todoText">${todoitem}</span>\
                </li>`
            );
        }
        index += 1;
    }

    index = 0;
    for (const doneitem of thisTab.doneItems) {
        if (thisTab.cursorPos === index + thisTab.todoItems.length + 1) {
            doneListItems.push(
                `<li><span class="checkbox" onClick="uncheck(${index}, render)">\
                    [<span class="check">█</span>]</span> <span class="todoText">${doneitem}</span>\
                </li>`
            );
        } else {
            doneListItems.push(
                `<li><span class="checkbox" onClick="uncheck(${index}, render)">\
                    [x]</span> <span class="todoText">${doneitem}</span>\
                </li>`
            );
        }
        index += 1;
    }

    document.getElementById("tabContainer").innerHTML = tabItems.join(" | ");
    document.getElementById("todoSectionItems").innerHTML = todoListItems.join(
        ""
    );
    document.getElementById("doneSectionItems").innerHTML = doneListItems.join(
        ""
    );
}

function OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
}

function handleKeyPress(e) {
    const maxItemCount =
        thisTab.todoItems.length + thisTab.doneItems.length + 1;
    if (e.key === "ArrowUp" && thisTab.cursorPos > 0) {
        thisTab.cursorPos -= 1;
        moveCursor();
    } else if (e.key === "ArrowDown" && thisTab.cursorPos < maxItemCount - 1) {
        thisTab.cursorPos += 1;
        moveCursor();
    } else if (e.key === "Enter" && thisTab.cursorPos !== 1) {
    }
}

function moveCursor() {
    if (thisTab.cursorPos === 0) {
        focusTextBox();
    } else {
        document.getElementById("newTodoTextBox").blur();
    }
    render();
}

function main() {
    // set the text-area to auto-resize
    var tx = document.getElementsByTagName("textarea");
    for (var i = 0; i < tx.length; i++) {
        tx[i].setAttribute(
            "style",
            "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
        );
        tx[i].addEventListener("input", OnInput, false);
    }

    // prevent arrows moving screen
    window.addEventListener(
        "keydown",
        function(e) {
            // space and arrow keys
            if ([38, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
            // backspace key
            else if (e.keyCode === 8) {
                deleteItem();
                render();
            }
            // edit key
            else if (e.keyCode === 69) {
                editItem();
                focusTextBox();
            }
            // change tab
            else if (e.keyCode === 9) {
                changeTab(1);
                e.preventDefault();
            }
        },
        false
    );

    window.addEventListener("click", function(e) {
        if (e.target.id === "newTodoTextBox") {
            thisTab.cursorPos = 0;
            render();
        }

        if (thisTab.cursorPos === 0) {
            focusTextBox();
        }
    });

    console.log("loaded");

    setDate();
    setLogo();

    moveCursor();
}
