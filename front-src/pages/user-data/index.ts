import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class UserData extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {}

  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="user-data-container">
    <h1 class="title">Mis datos</h1>
    <button class="update-data button">Modificar Datos Personales</button>
    <button class="update-password button">Modificar Contraseña</button>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("user-data-page", UserData);
