const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let lSLength = localStorage.length;
let localValue;


function newTodo() {
  const todoText = prompt("Add a todo!")
  if (todoText === null) return
  if (todoText != '') {
    todoElement = makeTodo(todoText)
    render(todoElement, list)
    countTodo(itemCountSpan)
    storage(todoText)
    countUncheckedTodo(uncheckedCountSpan)
    const checkbox = todoElement.children[1];
    const buttonDelete = todoElement.lastChild;

    checkbox.addEventListener("click", function (event) {
      if (event.target.checked) {
        countCheckedTodo(uncheckedCountSpan)
      } else {
        countUncheckedTodo(uncheckedCountSpan)
      }
    })
    buttonDelete.addEventListener("click", function (event) {
      if (confirm('Delete this task?')) {
        el = event.target.parentElement;
        el.parentElement.removeChild(el);
        countCheckedTodo(uncheckedCountSpan);
        countTodo(itemCountSpan)
        localStorage.clear();
      }
    })
  }
}

function makeTodo(todoText) {
  const li = document.createElement("li")
  addStyle(classNames.TODO_ITEM, li)

  const span = document.createElement("span")
  addStyle(classNames.TODO_TEXT, span)

  const buttonDelete = document.createElement("button");
  addStyle(classNames.TODO_DELETE, buttonDelete);

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox")
  addStyle(classNames.TODO_CHECKBOX, checkbox)

  span.textContent = todoText

  render(span, li)
  render(checkbox, li)
  render(buttonDelete, li)
  return li

}


function render(e, destination) {
  destination.appendChild(e)
}


function countTodo(e) {
  e.innerHTML = list.childNodes.length
}

function count(e) {
  let count = Number(e.innerHTML)
  count++
  e.innerHTML = count.toString()
}
function countUncheckedTodo(e) {
  count(e)
}


function countCheckedTodo(e) {
  let count = Number(e.innerHTML)
  count--
  e.innerHTML = count.toString()
}

function addStyle(style, e) {
  e.setAttribute("class", style)
}
 function store() {
    window.localStorage.myitems = list.innerHTML;
  }

function getValueAfterReload() {
	if(lSLength > 0) {
		for (i = 0; i < lSLength; i++) {
      let key = localStorage.key(i);
      var newLi = '<li class="todo-container"><span class="todo-text">' + localStorage[key] + '</span><input type="checkbox" class="todo-checkbox"><button class="todo-delete" onclick="addChild()"></button></li>';
      list.insertAdjacentHTML('beforeend', newLi);
		}
	}
}
getValueAfterReload();

