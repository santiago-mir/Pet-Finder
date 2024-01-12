import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class Home extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    const buttonEl = this.querySelector(".location");
    buttonEl?.addEventListener("click", () => {
      console.log("hola");
    });
  }
  render() {
    const petsImgsURL = require("url:../../assets/images.png");
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="main-container">
    <img src="${petsImgsURL}"/>
    <h1 class="title">Pet Finder App</h1>
    <p class="text">Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
    <custom-button class="location" color="#5A8FEC">Dar mi Ubicacion Actual </custom-button>
    <div></div>
    <custom-button color="#00A884">Como funciona Pet Finder?</custom-button>
    <div></div>
    <custom-button color="#5A8FEC">Inicia Sesion</custom-button>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("home-page", Home);
