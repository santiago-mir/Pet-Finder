import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class LostPets extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    console.log(location);
  }
  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <h1>Mascotas perdidas cerca</h1>
    <div class="pets-container">
    <h1>Soy una mascota perdida</h1>
    <h1>Soy una mascota perdida</h1>
    <h1>Soy una mascota perdida</h1>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("lost-pets-page", LostPets);
