import "./components/note-item.js";
import "./components/note-list.js";
import "./components/note-form.js";
import "./components/app-bar.js";
import "./components/footer-bar.js";
import "./components/note-search.js";
import notesData from "../data/notes-data.js";

document.addEventListener("DOMContentLoaded", () => {
  const noteList = document.querySelector("note-list");
  const noteSearch = document.querySelector("note-search");

  const savedNotes = JSON.parse(localStorage.getItem("notesData")) || notesData;
  noteList.notes = savedNotes;

  const noteForm = document.querySelector("note-form");
  noteForm.addEventListener("add-note", (e) => {
    noteList.handleAdd(e);
  });

  noteSearch.addEventListener("search-note", (e) => {
    noteList.handleSearch(e);
  });
});
