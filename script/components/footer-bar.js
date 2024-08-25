class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        footer {
            background: linear-gradient(to right, 
              #918A84, 
              #BDBAB5);
            color: white;
            text-align: center;
            font-weight: bold;
            padding: 1rem;
        }
        p {
          margin: 0;
        }
      </style>
      <footer>
        <p>&copy; 2024 Adzkia adi. All rights reserved.</p>
      </footer>
    `;
  }
}

customElements.define("footer-bar", FooterBar);
