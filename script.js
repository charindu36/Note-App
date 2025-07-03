let notes = [];
let editingNoteId = null;


// Load notes from localStorage
function loadNotes() {
  const savedNotes = localStorage.getItem("quickNotes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}

// Save a note (add or update)
function saveNote(event) {
  event.preventDefault();

  // Make sure the selectors match your HTML IDs
  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  if (!title && !content) return; // avoid saving empty notes

  if (editingNoteId) {
    // Update existing note
    const noteIndex = notes.findIndex((note) => note.id === editingNoteId);
    if (noteIndex !== -1) {
      notes[noteIndex] = {
        ...notes[noteIndex],
        title: title,
        content: content,
        createdAt:generateDate(),
      };
    }
  } else {
    // Add new note
    notes.unshift({
      id: generateId(),
      title: title,
      content: content,
      createdAt: generateDate(),
    });
  }

  closeNoteDialog();
  saveNotes();
  renderNotes();
}

// Generate unique Date
function generateDate() {
  const now = new Date()
  const formattedDate = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,0)+'-'+String(now.getDate()).padStart(2,0)+' '+String(now.getHours()%12).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,0)+":"+String((now.getHours<12?'AM':'PM'))
  return formattedDate.toString();
}

// Generate unique ID
function generateId() {
  return Date.now().toString();
}

// Save notes array to localStorage
function saveNotes() {
  localStorage.setItem("quickNotes", JSON.stringify(notes));
}

// Delete a note by ID
function deleteNote(noteId) {
  notes = notes.filter((note) => note.id !== noteId);
  saveNotes();
  renderNotes();
}

// Render notes to the page
function renderNotes() {
  const noteContainer = document.querySelector(".notes-container");

  if (notes.length === 0) {
    document.getElementById('order').style.display='none'
    noteContainer.innerHTML = `
      <div class="empty-state">
        <h2>No note yet</h2>
        <p>Create your first note to get started.</p>
        <button id="add-note" onclick="openNoteDialog()">+</button>
      </div>`;
    return;
  }else{
  document.getElementById('order').style.display='flex'
  noteContainer.innerHTML = notes
    .map(
      (note) => `
    <div class="note-card">
    <div class="note-header">
      <h3 class="note-title">${note.title}</h3>
      <h6>${note.createdAt}</h6>
    </div>
      <code class="note-content">${note.content}</code>
      <div class="note-actions">
        <button class="edit-btn" onclick="openNoteDialog('${note.id}')" title="Edit Note">Edit</button>
        <button class="delete-btn" onclick="deleteNote('${note.id}')">Delete</button>
      </div>
    </div>
  `
    )
    .join("");
  }
}

// Open note dialog (add or edit)
function openNoteDialog(noteId = null) {
  const dialog = document.getElementById("DialogBox");
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");

  if (noteId) {
    // Edit existing note
    const noteEdit = notes.find((note) => note.id === noteId);
    if (noteEdit) {
      editingNoteId = noteId;
      document.getElementById("dialogTitle").textContent = "Edit Note";
      titleInput.value = noteEdit.title;
      contentInput.value = noteEdit.content;
      noteEdit.createdAt=new Date()
    }
  } else {
    // Add new note
    editingNoteId = null;
    document.getElementById("dialogTitle").textContent = "Add New Note";
    titleInput.value = "";
    contentInput.value = "";
  }

  dialog.showModal();
  titleInput.focus();
}

// Close the note dialog
function closeNoteDialog() {
  document.getElementById("DialogBox").close();
}

// Toggle dark/light theme
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.getElementById("theme-toggle").textContent = isDark ? "🌞" : "🌙";
}

// Apply saved theme on load
function applyPrevTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    document.getElementById("theme-toggle").textContent = "🌞";
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  applyPrevTheme();
  notes = loadNotes();
  //notes.reverse()
  renderNotes();
  document.getElementById("noteForm").addEventListener("submit", saveNote);
  document.getElementById('order').addEventListener('click', ()=>{notes.reverse();renderNotes()})
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
  document
    .getElementById("DialogBox")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeNoteDialog();
      }
    });
});

const menuBtn = document.querySelector('.menu-button')
const menuContent = document.querySelector('.menu-content')
menuBtn.addEventListener('click',()=>{
  menuContent.style.display = menuContent.style.display === 'flex'?'none':'flex'
})

// const now = new Date()
// console.log(now)
// const formattedDate = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,0)+'-'+String(now.getDate()).padStart(2,0)+' '+String(now.getHours()%12).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,0)+":"+String(now.getSeconds()).padStart(2,0)+':'+String((now.getHours<12?'AM':'PM'))

// console.log(formattedDate)