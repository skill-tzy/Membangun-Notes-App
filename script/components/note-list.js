import "./note-item.js";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notesData = [];
    this.filteredNotes = [];
  }

  set notes(notes) {
    this.notesData = notes;
    this.filteredNotes = notes;
    this.saveNotes();
    this.render();
  }

  connectedCallback() {
    this.render();
    this.addEventListener("add-note", (e) => this.handleAdd(e));
  }

  render() {
    const activeNotes = this.filteredNotes.filter((note) => !note.archived);
    const archivedNotes = this.filteredNotes.filter((note) => note.archived);

    this.shadowRoot.innerHTML = `
            <style>
                .note-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1rem;
                }
                .archive-list {
                    margin-top: 2rem;
                    border-top: 1px solid #e8e6e6;
                    padding-top: 1rem;
                }
            </style>
            <div class="note-list">
                ${activeNotes
                  .map(
                    () => `
                    <note-item></note-item>
                `
                  )
                  .join("")}
            </div>
            <div class="archive-list">
                <h2>Archived Notes</h2>
                ${archivedNotes
                  .map(
                    () => `
                    <note-item></note-item>
                `
                  )
                  .join("")}
            </div>
        `;

    this.shadowRoot
      .querySelectorAll(".note-list note-item")
      .forEach((noteItem, index) => {
        noteItem.note = activeNotes[index];
      });

    this.shadowRoot
      .querySelectorAll(".archive-list note-item")
      .forEach((noteItem, index) => {
        noteItem.note = archivedNotes[index];
      });

    this.shadowRoot.querySelectorAll("note-item").forEach((noteItem) => {
      noteItem.addEventListener("archive-note", (e) => this.handleArchive(e));
      noteItem.addEventListener("delete-note", (e) => this.handleDelete(e));
    });
  }

  handleAdd(event) {
    const newNote = event.detail;
    this.notesData = [newNote, ...this.notesData];
    this.filteredNotes = this.notesData;
    this.saveNotes();
    this.render();
  }

  handleArchive(event) {
    const noteId = event.detail.id;
    this.notesData = this.notesData.map((note) =>
      note.id === noteId ? { ...note, archived: !note.archived } : note
    );
    this.filteredNotes = this.notesData;
    this.saveNotes();
    this.render();
  }

  handleDelete(event) {
    const noteId = event.detail.id;
    this.notesData = this.notesData.filter((note) => note.id !== noteId);
    this.filteredNotes = this.notesData;
    this.saveNotes();
    this.render();
  }

  handleSearch(event) {
    const searchQuery = event.detail.toLowerCase();
    this.filteredNotes = this.notesData.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery) ||
        note.body.toLowerCase().includes(searchQuery)
    );
    this.render();
  }

  saveNotes() {
    localStorage.setItem("notesData", JSON.stringify(this.notesData));
  }
}

customElements.define("note-list", NoteList);
