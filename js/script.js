const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const taskTable = document.getElementById("taskTable");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterSelect = document.getElementById("filterSelect");

const taskError = document.getElementById("taskError");
const dateError = document.getElementById("dateError");

const editModal = document.getElementById("editModal");
const editTaskInput = document.getElementById("editTaskInput");
const editDateInput = document.getElementById("editDateInput");
const editStatusInput = document.getElementById("editStatusInput");
const saveEditBtn = document.getElementById("saveEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

const editTaskError = document.getElementById("editTaskError");
const editDateError = document.getElementById("editDateError");

let editRow = null;

function clearErrors() {
  taskError.textContent = "";
  dateError.textContent = "";
}

addBtn.addEventListener("click", () => {
  clearErrors();
  const task = taskInput.value.trim();
  const date = dateInput.value;

  let valid = true;
  if (task === "") {
    taskError.textContent = "Task cannot be empty";
    valid = false;
  }
  if (date === "") {
    dateError.textContent = "Date cannot be empty";
    valid = false;
  }
  if (!valid) return;

  if (taskTable.querySelector(".empty")) {
    taskTable.innerHTML = "";
  }

const row = document.createElement("tr");
row.innerHTML = `
  <td>${task}</td>
  <td>${date}</td>
  <td><span class="badge badge-pending">Pending</span></td>
  <td>
    <button class="btn-warning" onclick="openEditModal(this)">Edit</button>
    <button class="btn-danger" onclick="deleteTask(this)">Delete</button>
  </td>
`;
  taskTable.appendChild(row);

  taskInput.value = "";
  dateInput.value = "";
});

function openEditModal(btn) {
  editRow = btn.parentElement.parentElement;
  editTaskInput.value = editRow.cells[0].innerText;
  editDateInput.value = editRow.cells[1].innerText;
  editStatusInput.value = editRow.cells[2].innerText;
  editTaskError.textContent = "";
  editDateError.textContent = "";
  editModal.style.display = "flex";
}

saveEditBtn.addEventListener("click", () => {
  editTaskError.textContent = "";
  editDateError.textContent = "";

  if (!editRow) return;
  let valid = true;
  if (editTaskInput.value.trim() === "") {
    editTaskError.textContent = "Task cannot be empty";
    valid = false;
  }
  if (editDateInput.value === "") {
    editDateError.textContent = "Date cannot be empty";
    valid = false;
  }
  if (!valid) return;

  editRow.cells[0].innerText = editTaskInput.value.trim();
  editRow.cells[1].innerText = editDateInput.value;

  let statusText = editStatusInput.value;
  let badgeClass =
    statusText === "Pending" ? "badge badge-pending" :
    statusText === "In Progress" ? "badge badge-inprogress" :
    "badge badge-complete";

  editRow.cells[2].innerHTML = `<span class="${badgeClass}">${statusText}</span>`;
  editModal.style.display = "none";
});

cancelEditBtn.addEventListener("click", () => {
  editModal.style.display = "none";
});

function deleteTask(btn) {
  btn.parentElement.parentElement.remove();
  checkEmpty();
}

deleteAllBtn.addEventListener("click", () => {
  taskTable.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
});

filterSelect.addEventListener("change", () => {
  const filter = filterSelect.value;
  const rows = taskTable.querySelectorAll("tr");

  rows.forEach(row => {
    if (row.querySelector(".empty")) return;
    const status = row.cells[2].innerText;
    row.style.display = (filter === "all" || filter === status) ? "" : "none";
  });
});

function checkEmpty() {
  if (taskTable.rows.length === 0) {
    taskTable.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
  }
}

function setMinDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  dateInput.setAttribute("min", todayStr);
  editDateInput.setAttribute("min", todayStr);
}

setMinDate();
