import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class Home extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    const buttonEl = this.querySelector(".button");
    buttonEl?.addEventListener("click", () => {
      Router.go("/login");
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
    <button class="button">Dar mi Ubicacion Actual </button>
    <div></div>
    <button class="button">Como funciona Pet Finder?</button>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("home-page", Home);
