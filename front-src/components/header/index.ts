class CustomHeader extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  addListeners() {
    const menuEl = this.shadow.querySelector(".menu-mobile");
    const closeButtonEl = this.shadow.querySelector(
      ".menu-mobile__close-button"
    );
    const hiddenMenuEl = this.shadow.querySelector(
      ".menu-mobile__conteiner"
    ) as any;
    menuEl?.addEventListener("click", (event) => {
      hiddenMenuEl.style.display = "grid";
    });
    closeButtonEl?.addEventListener("click", (ev) => {
      hiddenMenuEl.style.display = "none";
    });
  }
  render() {
    const headerEl = document.createElement("header");
    const style = document.createElement("style");
    const imgURL = require("url:../../assets/menu.png");
    const mapsURL = require("url:../../assets/maps.png");
    const closeURL = require("url:../../assets/close.png");
    style.innerHTML = `
     .header{
        height: 85px;
        min-width: 330px;
        background-color: #c1c1c1;
        display:flex;
        justify-content: space-between;
        padding: 10px;
     }
     .menu-mobile__conteiner {
      display: none;
      position: absolute;
      background-color: grey;
      height: 100vh;
      width: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
  }
    .menu-mobile__close-button{
      justify-self: end;
    }
    .options{
      display: flex;
      gap: 60px;
      font-size: 30px;
      flex-direction: column;
      justify-self: center;
    }
    }
    }
    
    `;
    headerEl.innerHTML = `
    <img src="${mapsURL}">
    <img class="menu-mobile" src="${imgURL}"  />
    <div class="menu-mobile__conteiner">
    <img class="menu-mobile__close-button" src="${closeURL}" alt="close-button"/>
    <nav class="options">
      <a>Mis Datos</a>
      <a>Mis Mascotas Reportadas</a>
      <a>Reportar Mascota</a>
  </nav>
    </div>
    `;
    this.shadow.appendChild(style);
    headerEl.classList.add("header");
    this.shadow.appendChild(headerEl);
    this.addListeners();
  }
}
customElements.define("custom-header", CustomHeader);
