class CustomHeader extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const headerEl = document.createElement("header");
    const style = document.createElement("style");
    const imgURL = require("url:../../assets/menu.png");
    style.innerHTML = `
     .header{
        height: 85px;
        min-width: 330px;
        background-color: grey;
     }
    `;
    headerEl.innerHTML = `
    <img src="${imgURL}"  />
    <div> soy otro icono</div>
    `;

    this.shadow.appendChild(style);
    headerEl.classList.add("header");
    this.shadow.appendChild(headerEl);
  }
}
customElements.define("custom-header", CustomHeader);
