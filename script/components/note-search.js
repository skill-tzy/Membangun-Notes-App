class NoteSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const placeholderText = this.getAttribute('placeholder-text') || 'Search';
 
    this.shadowRoot.innerHTML = `
      <style>
        .search-card {
          background: white;
          border: 1px solid #e8e6e6;
          border-radius: 8px;
          padding: 1rem;
        }
        input {
          padding: 0.6rem;
          border: 1px solid #e8e6e6;
          border-radius: 4px;
          width: 98%;
          transition: all 0.3s ease-in-out;
        }
        input:focus {
          border-color: #BDBAB5;
          border-width: 1.9px;
          outline: none;
        }
      </style>
      <div class="search-bar">
        <div class="search-card">
          <input type="text" id="search" placeholder="${placeholderText}" />
        </div>
      </div>
    `;

    this.shadowRoot
      .querySelector("#search")
      .addEventListener("input", (event) => {
        const searchEvent = new CustomEvent("search-note", {
          detail: event.target.value,
        });
        this.dispatchEvent(searchEvent);
      });
  }
}

customElements.define("note-search", NoteSearch);
