class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.startClock();
  }

  startClock() {
    const clockElement = this.shadowRoot.querySelector('#clock');
    setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      const formattedDate = now.toLocaleDateString();
      clockElement.textContent = `${formattedDate} ${formattedTime}`;
    }, 1000);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        header {
          background: linear-gradient(to right, 
              #918A84, 
              #BDBAB5);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
        }
        h1 {
          margin: 0;
          font-size: 1.5rem;
        }
        #clock {
          font-size: 1rem;
        }
      </style>
      <header>
        <h1>Notes App</h1>
        <div id="clock"></div>
      </header>
    `;
  }
}

customElements.define("app-bar", AppBar);
