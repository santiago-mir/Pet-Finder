import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class Home extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    // login button
    const logInButtonEl = this.querySelector(".login");
    logInButtonEl?.addEventListener("click", () => {
      Router.go("/login");
    });
    // location button
    const locationButtonEl = this.querySelector(".location");
    locationButtonEl?.addEventListener("click", (event) => {
      if (!navigator.geolocation) {
        console.log("hubo un error");
      } else {
        navigator.geolocation.getCurrentPosition(this.success);
      }
    });
    // instructions button
    const instructionsButtonEl = this.querySelector(".instructions");
    instructionsButtonEl?.addEventListener("click", (event) => {
      Router.go("/instructions");
    });
  }
  // handler para navigator.geolocation
  success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log(lat, lng);
  }
  render() {
    const petsImgsURL = require("url:../../assets/images.png");
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="main-container">
    <img src="${petsImgsURL}"/>
    <h1 class="title">Pet Finder App</h1>
    <p class="text">Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
    <button class="location button">Dar mi Ubicacion Actual </button>
    <div></div>
    <button class="instructions button">Como funciona Pet Finder?</button>
    <div></div>
    <button class="login button">Inicia Sesion</button>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("home-page", Home);
