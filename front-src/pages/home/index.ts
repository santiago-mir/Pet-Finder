import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class Home extends HTMLElement {
  connectedCallback() {
    if (state.getToken()) {
      this.uptadePage();
    } else {
      this.render();
      console.log("el token no esta activo");
    }
  }
  getPetsURL() {
    const petsImgsURL = require("url:../../assets/images.png");
    return petsImgsURL;
  }
  addUpdatedListeners() {
    // cargar los reports del user desde la DB solo una vez, despues, si se suman nuevos reportes,
    // se actualizan desde la report page
    if (!state.getUserReports()) {
      state.updateUserReports();
    }
    // permitir geolocation button
    const locationButtonEl = this.querySelector(".location");
    locationButtonEl?.addEventListener("click", (event) => {
      if (!navigator.geolocation) {
        console.log("hubo un error");
      } else {
        navigator.geolocation.getCurrentPosition(this.success);
        state.suscribe(() => {
          Router.go("/lost-pets");
        });
      }
    });
    // report pets button
    const reportButton = this.querySelector(".report");
    reportButton?.addEventListener("click", (event) => {
      Router.go("/report-pet");
    });
    //log-out button
    const logOutButtonEl = this.querySelector(".logout");
    logOutButtonEl?.addEventListener("click", (event) => {
      state.clearStorage();
    });
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
        state.suscribe(() => {
          Router.go("/lost-pets");
        });
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
    state.setUserLocation(lat, lng);
  }
  // una vez que el user se loguea, vuelve a la home con la info actualizada
  uptadePage() {
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="main-container">
    <img src="${this.getPetsURL()}"/>
    <h1 class="title">Hola ${state.getUserName()}</h1>
    <h2 class="title">Pet Finder App</h2>
    <p class="text">Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
    <button class="location button">Dar mi Ubicacion Actual </button>
    <div></div>
    <button class="report button">Reportar una mascota perdida</button>
    <div></div>
    <button class="logout button">Cerrar sesion</button>
    </div>
    `;
    this.addUpdatedListeners();
  }
  // render original, sin user logueado
  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="main-container">
    <img src="${this.getPetsURL()}"/>
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
