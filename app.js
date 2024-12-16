const inputELement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");

const notes = JSON.parse(localStorage.getItem("notes")) || [];

createBtn.addEventListener("click", () => {
  if (inputELement.value === "") {
    return;
  }
  const newNote = { title: inputELement.value, completed: false };
  notes.push(newNote);
  render();
  saveToStorage();
  inputELement.value = "";
});
function getNoteTemplate(note, index) {
  return `
    <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span class="${
            note.completed ? "text-decoration-line-through" : ""
          }">${note.title}</span>
          <span>
            <span class="btn btn-small btn-${
              note.completed ? "warning" : "success"
            }" data-index="${index}" data-type="toggle">&check;</span>
            <span class="btn btn-small btn-danger"  data-index="${index}" data-type="remove">&times;</span>
          </span>
        </li>
    `;
}

listElement.addEventListener("click", (e) => {
  if (e.target.dataset.index) {
    const index = parseInt(e.target.dataset.index);
    const type = e.target.dataset.type;
    if (type === "toggle") {
      notes[index].completed = !notes[index].completed;
    } else if (type === "remove") {
      notes.splice(index, 1);
    }
    saveToStorage();
    render();
  }
});

function render() {
  listElement.innerHTML = "";
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i));
  }
}
render();

function saveToStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
