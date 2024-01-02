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
    const mapsURL = require("url:../../assets/maps.png");
    style.innerHTML = `
     .header{
        height: 85px;
        min-width: 330px;
        background-color: #c1c1c1;
        display:flex;
        justify-content: space-between;
        padding: 10px;
     }
    `;
    headerEl.innerHTML = `
    <img src="${mapsURL}">
    <img src="${imgURL}"  />
    `;

    this.shadow.appendChild(style);
    headerEl.classList.add("header");
    this.shadow.appendChild(headerEl);
  }
}
customElements.define("custom-header", CustomHeader);
