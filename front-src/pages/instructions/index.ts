import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class Instructions extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    const locationButtonEl = this.querySelector(".location");
    locationButtonEl?.addEventListener("click", (event) => {
      if (!navigator.geolocation) {
        console.log("hubo un error");
      } else {
        navigator.geolocation.getCurrentPosition(this.success);
        Router.go("/lost-pets");
      }
    });
  }
  success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log(lat, lng);
  }
  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="instructions-container">
    <h1>¿Como Funciona Pet Finder?</h1>
    <h4>Compartiendo tu ubicacion, podes ver las mascotas perdidas por tu zona y ayudar a sus dueños a encontrarlas</h4>
    <h4>Si perdiste tu mascota, podes reportarla y nosotros te avisaremos por mail si alguien la vio o la encontro</h4>
    <button class="location button">Compartir mi ubicacion</button>
    <button class="singin button">Iniciar Sesion</button>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("instructions-page", Instructions);
