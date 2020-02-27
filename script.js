const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')


document.addEventListener("click", e => {
  if (e.target.matches(".todo-delete")) {
    if (confirm('Delete this task?')) {
      el = e.target.parentElement;
      el.parentElement.removeChild(el);
      updateCount()
      store()
    }
  }
  if (e.target.matches(".todo-checkbox")) {
    if (e.target.checked) {
      store()
      countCheckedTodo(uncheckedCountSpan)
    } else {
      store()
      count(uncheckedCountSpan)
    }
  }
}, false);

function newTodo() {
  const todoText = prompt("Add a todo!")
  if (todoText === null) return
  if (todoText != '') {
    todoElement = makeTodo(todoText)
    render(todoElement, list)
    updateCount()
    store();
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
  render(checkbox, li)
  render(span, li)
  render(buttonDelete, li)
  return li
}
function render(element, destination) {
  destination.appendChild(element)
}
function count(e) {
  let count = Number(e.innerHTML)
  count++
  e.innerHTML = count.toString()
}
function countCheckedTodo(e) {
  let count = Number(e.innerHTML)
  count--
  e.innerHTML = count.toString()
}
function store() {
  window.localStorage.myItemsList = list.innerHTML;
  var arr = $('.todo-checkbox').map(function () {
    return this.checked;
  }).get();
  localStorage.setItem("checked", JSON.stringify(arr));
}
function getStore() {
  let storedValues = window.localStorage.myItemsList;
  if (!storedValues) {
    list.innerHTML = '';
  }
  else {
    list.innerHTML = storedValues;
    var arr = JSON.parse(localStorage.getItem('checked')) || [];
    arr.forEach(function (checked, i) {
      $('.todo-checkbox').eq(i).prop('checked', checked);
    });
  }
}
function addStyle(style, element) {
  element.setAttribute("class", style)
}
function updateCount() {
  itemCountSpan.innerHTML = list.childNodes.length
  let allCheckbox = document.querySelectorAll('input[type="checkbox"]').length
  let checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length
  let uncheckedCount = allCheckbox - checkedCount
  uncheckedCountSpan.innerHTML = uncheckedCount
}

getStore();
updateCount()
