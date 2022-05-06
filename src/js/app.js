// DOM variables;
const addBtn = document.querySelector("#task-add-btn");
const taskInput = document.querySelector("#task-input");
const todoDisplay = document.querySelector(".to-do-tasks-container");
const doneDisplay = document.querySelector(".done-tasks-container");
const emptyTextContainer = document.querySelector(".empty-text-container");

function extractTaskValue() {
  let todos = [];
  let newTodo = {
    id: generateID(),
    content: taskInput.value,
    date: new Date(),
  };
  todos.push(newTodo);
  let formatData = `${
    newTodo.date.getDay() +
    " " +
    newTodo.date.toLocaleString("default", { month: "long" }) +
    " " +
    newTodo.date.getFullYear() +
    " " +
    newTodo.date.getHours() +
    ":" +
    newTodo.date.getMinutes()
  }`;
  todos.push(formatData);
  return todos;
}

function generateID() {
  let length = todoDisplay.children.length + 1;
  return `task${length}`;
}

function addTask(data) {
  const newTask = document.createElement("div");
  newTask.classList.add("task-container");

  const newTaskText = document.createElement("div");
  newTaskText.classList.add("checkbox-container");

  //   checkbox Creation
  const checkboxTask = document.createElement("input");
  checkboxTask.type = "checkbox";
  checkboxTask.id = data[0].id;
  checkboxTask.classList.add("taskCheckbox");
  newTaskText.appendChild(checkboxTask);
  // DisplayInput
  const displayInput = document.createElement("input");
  displayInput.type = "text";
  displayInput.setAttribute("value", `${data[0].content + " - " + data[1]}`);
  displayInput.readOnly = true;
  displayInput.style.cursor = "default";
  //Container for display input to create a pseudo element
  const containerDisplayInput = document.createElement("div");
  containerDisplayInput.classList.add("container-for-display-input");
  containerDisplayInput.appendChild(displayInput);
  newTaskText.appendChild(containerDisplayInput);
  //Task Text Input container
  const newTaskBtns = document.createElement("div");

  newTaskBtns.innerHTML = `
  <img src="./img/edit.svg" alt="edit icon" class="edit-btn" onclick="editFunction(this)">
  <img src="./img/delete.svg" alt="delete icon" class="delete-btn" onclick="deleteFunction(this)">
  `;

  newTask.appendChild(newTaskText);
  newTask.appendChild(newTaskBtns);
  todoDisplay.appendChild(newTask);
  addBtn.disabled = true;
  //Function to move
  checkboxTask.onclick = () => moveToDone(newTask);
  setTimeout(() => alert(`🛎 Не забудь про: ${value}`), 10000);
}

function moveToDone(el) {
  console.log(el);
  el.classList.add("done");
  doneDisplay.appendChild(el);
  checkIfEmpty();
}

function checkIfEmpty() {
  const childrenLength = todoDisplay.children.length;
  if (childrenLength === 0) {
    todoDisplay.appendChild(emptyTextContainer);
  }
  return;
}

function editFunction(el) {
  //find input to edit
  const input =
    el.parentElement.parentElement.children[0].children[1].children[0];
  // find parent element
  const parent = el.parentElement;
  //make Siblings button and checkbox to disapear
  const inputContainer = input.parentElement;
  const checkbox = input.parentElement.previousElementSibling;
  const editBtn = parent.children[0];
  const removeBtn = parent.children[1];
  inputContainer.classList.add("edit-input-container");
  inputContainer.classList.remove("container-for-display-input");
  checkbox.style.display = "none";
  editBtn.style.display = "none";
  removeBtn.style.display = "none";
  //make input enabled
  input.readOnly = false;
  //create Save Btn
  const saveBtn = document.createElement("div");
  saveBtn.classList.add("save-btn");
  saveBtn.innerText = "Сохранить";
  saveBtn.onclick = () =>
    saveFunction(input, editBtn, removeBtn, saveBtn, inputContainer, checkbox);
  parent.appendChild(saveBtn);
}

function saveFunction(
  input,
  editBtn,
  removeBtn,
  saveBtn,
  inputContainer,
  checkbox
) {
  input.readOnly = true;
  checkbox.style.display = "flex";
  editBtn.style.display = "inline";
  removeBtn.style.display = "inline";
  saveBtn.style.display = "none";
  inputContainer.classList.remove("edit-input-container");
  inputContainer.classList.add("container-for-display-input");
}

function deleteFunction(el) {
  el.parentElement.parentElement.remove();
  checkIfEmpty();
}

function clearInput() {
  taskInput.value = "";
}

function removeEmptyText() {
  const childrenLength = todoDisplay.children.length;
  if (emptyTextContainer && childrenLength === 1 && taskInput.value) {
    emptyTextContainer.remove();
  } else return;
}

addBtn.addEventListener("click", () => {
  removeEmptyText();
  const data = extractTaskValue();
  addTask(data);
  clearInput();
});

taskInput.addEventListener("input", (event) => {
  addBtn.disabled = false;
  if (taskInput.value === "") addBtn.disabled = true;
});

taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addBtn.click();
  }
});
