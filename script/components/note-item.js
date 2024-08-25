class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set note(note) {
    this.render(note);
  }

  render(note) {
    const createdAt = new Date(note.createdAt);
    const formattedDate = createdAt.toISOString().slice(0, 19).replace('T', ' ');
    this.shadowRoot.innerHTML = `
            <style>
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
                div {
                    background: white;
                    border: 1px solid #e8e6e6;
                    padding: 1rem;
                    border-radius: 8px;
                    position: relative;
                }
                h3 {
                    margin: 0;
                    font-size: 1.25rem;
                }
                p {
                    font-size: 1rem;
                    margin: 0.5rem 0;
                    margin-right: 100px;
                }
                .created-at {
                  font-size: 0.85rem;
                  color: #777;
                  margin-top: 0.25rem;
                }
                .note-actions {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    display: flex;
                    gap: 0.5rem;
                }
                button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                }
                button.archive {
                    color: green;
                }
                button.delete {
                    color: red;
                }
            </style>
            <div>
                <h3>${note.title}</h3>
                <p>${note.body}</p>
                <span class="created-at">Created on: ${formattedDate}</span>
                <div class="note-actions">
                    <button class="archive" title="Archive"><i class="fas fa-archive"></i></button>
                    <button class="delete" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;

    this.shadowRoot.querySelector(".archive").addEventListener("click", () => {
      if (!note.archived) {
        Swal.fire("Archived!", "Note archived.", "success");
      } else {
        Swal.fire("Unarchived!", "Note unarchived.", "success");
      }
      this.dispatchEvent(new CustomEvent("archive-note", { detail: note }));
    });

    this.shadowRoot.querySelector(".delete").addEventListener("click", () => {
      Swal.fire({
        title: "Certain?",
        text: "Note will not be returned!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Note deleted.", "success");
          this.dispatchEvent(new CustomEvent("delete-note", { detail: note }));
        }
      });
    });
  }
}

customElements.define("note-item", NoteItem);
