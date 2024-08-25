class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const formType = this.getAttribute('data-form-type') || 'default';

    this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                    margin-top: 2rem;
                }
                input, textarea {
                    padding: 0.5rem;
                    border: 1px solid #e8e6e6;
                    border-radius: 4px;
                    font-size: 0.8rem;
                }
                input:focus, textarea:focus {
                  border-color: #BDBAB5;
                  border-width: 1.9px;
                  outline: none;
                }
                .button-container {
                  display: flex;
                  justify-content: center;
                }
                button {
                    padding: 0.6rem;
                    background-color: #BDBAB5;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    font-weight: 500;
                    transition: .5s ease;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #918A84;
                }
            </style>
            <form>
                <input type="text" id="title" placeholder="Title" required />
                <textarea id="body" rows="4" placeholder="Body" required></textarea>
                <div class="button-container">
                  <button type="submit">${formType}</button>
                </div>
            </form>
        `;

    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");
    const titleError = this.shadowRoot.querySelector("#title-error");
    const bodyError = this.shadowRoot.querySelector("#body-error");

    titleInput.addEventListener("input", () => {
      if (titleInput.value.trim() === "") {
        titleError.textContent = "Title is required.";
      } else {
        titleError.textContent = "";
      }
    });

    bodyInput.addEventListener("input", () => {
      if (bodyInput.value.trim() === "") {
        bodyError.textContent = "Body is required.";
      } else {
        bodyError.textContent = "";
      }
    });

    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        if (titleInput.value.trim() === "" || bodyInput.value.trim() === "") {
          if (titleInput.value.trim() === "") titleError.textContent = "Title is required.";
          if (bodyInput.value.trim() === "") bodyError.textContent = "Body is required.";
          return;
        }

        const title = this.shadowRoot.getElementById("title").value;
        const body = this.shadowRoot.getElementById("body").value;
        const note = {
          id: `notes-${Date.now()}`,
          title,
          body,
          createdAt: new Date().toISOString(),
          archived: false,
        };
        this.dispatchEvent(new CustomEvent("add-note", { detail: note }));
        this.shadowRoot.querySelector("form").reset();
      });
  }
}

customElements.define("note-form", NoteForm);
