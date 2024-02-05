import { state } from "../../state";
import { Router } from "@vaadin/router";

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

    const hiddenMenuEl = this.shadow.querySelector(
      ".menu-mobile__conteiner"
    ) as any;
    menuEl?.addEventListener("click", (event) => {
      hiddenMenuEl.style.display = "grid";
    });
    // close button del menu
    const closeButtonEl = this.shadow.querySelector(
      ".menu-mobile__close-button"
    );
    closeButtonEl?.addEventListener("click", (ev) => {
      hiddenMenuEl.style.display = "none";
    });
    // my data option
    const userDataOptionEl = this.shadow.querySelector(".user-data");
    userDataOptionEl?.addEventListener("click", (e) => {
      if (state.getToken()) {
        Router.go("/my-data");
      } else {
        Router.go("/login");
      }
    });
    // my reports option
    const userReportOptionEl = this.shadow.querySelector(".user-reports");
    userReportOptionEl?.addEventListener("click", (e) => {
      if (state.getToken()) {
        Router.go("/my-reports");
      } else {
        Router.go("/login");
      }
    });
    // report pet option
    const reportPetOptionEl = this.shadow.querySelector(".report-pet");
    reportPetOptionEl?.addEventListener("click", (e) => {
      if (state.getToken()) {
        Router.go("/report-pet");
      } else {
        Router.go("/login");
      }
    });
    // home img
    const mapImgEl = this.shadow.querySelector(".home-img");
    mapImgEl?.addEventListener("click", (e) => {
      Router.go("/home");
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
      font-weight: 700;
      font-family: "POPPINS";
      color: white;
      flex-direction: column;
      justify-self: center;
    }
    .info-container{
      display: flex;
      flex-direction: column;
      font-weight: 400;
      font-size: 20px;
      align-items: center;

    }
    
    
    
    `;
    headerEl.innerHTML = `
    <img class="home-img"src="${mapsURL}">
    <img class="menu-mobile" src="${imgURL}"  />
    <div class="menu-mobile__conteiner">
    <img class="menu-mobile__close-button" src="${closeURL}" alt="close-button"/>
    <nav class="options">
      <a class="user-data">Mis Datos</a>
      <a class="user-reports">Mis Mascotas Reportadas</a>
      <a class="report-pet">Reportar Mascota</a>
      <div class="info-container">
      <p class="email">${state.getUserEmail()}</p>
      <a class="log-out">Cerrar sesion</a>
      </div>

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
