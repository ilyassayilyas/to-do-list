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

  newTaskText.innerHTML = `
    <input type="checkbox" id= "${data[0].id}" name="${
    data[0].id
  }" class="taskCheckbox" onClick="moveToDone(this)">
    <label for="${data[0].id}" class="new-task-label">${
    data[0].content + " - " + data[1]
  }</label>
        `;

  const newTaskBtns = document.createElement("div");
  newTaskBtns.innerHTML = `
        <img src="./img/edit.svg" alt="edit icon" class="edit-btn" onclick="editFunction(this)">
        <img src="./img/delete.svg" alt="delete icon" class="delete-btn" onclick="deleteFunction(this)">
        `;

  newTask.appendChild(newTaskText);
  newTask.appendChild(newTaskBtns);
  todoDisplay.appendChild(newTask);
  addBtn.disabled = true;

  //   setTimeout(() => alert(`🛎 Не забудь про: ${data[0].content}`), 10000);
}

function editFunction(el) {
  //Element creation
  const editContainer = document.createElement("div");
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = taskInput.value;
  const saveBtn = document.createElement("div");
  saveBtn.classList.add("save-btn");
  saveBtn.innerText = "Сохранить";
  editContainer.appendChild(editInput);
  editContainer.appendChild(saveBtn);
  editContainer.classList.add("edit-container");
  //add Css to newly created element
  el.parentElement.parentElement.appendChild(editContainer);
  editContainer.style.display = "flex";
  //Add value to input to ba able to modify it in future;
  const label = document.querySelector(".new-task-label");
  editInput.value = label.innerText;
  //Event listener to save butn
  saveBtn.addEventListener("click", () =>
    saveEdition(editInput, label, editContainer)
  );
}

function saveEdition(edited, saveTo, container) {
  console.log(saveTo);
  saveTo.innerText = edited.value;
  container.style.display = "none";
}

function moveToDone(el) {
  const task = el.parentElement.parentElement;
  task.classList.add("done");
  doneDisplay.appendChild(task);
}

function deleteFunction(el) {
  el.parentElement.parentElement.remove();
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

taskInput.addEventListener("input", () => {
  addBtn.disabled = false;
  if (taskInput.value === "") addBtn.disabled = true;
});
