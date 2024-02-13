import { Router } from "@vaadin/router";
import { state } from "../../state";

class UserData extends HTMLElement {
  connectedCallback() {
    if (!state.getToken()) {
      Router.go("/home");
    }
    this.render();
  }
  addListeners() {
    const updateDataButton = this.querySelector(".update-data");
    updateDataButton?.addEventListener("click", (e) => {
      Router.go("/update-data");
    });
    const updatePasswordButton = this.querySelector(".update-password");
    updatePasswordButton?.addEventListener("click", (e) => {
      Router.go("/update-password");
    });
  }

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
