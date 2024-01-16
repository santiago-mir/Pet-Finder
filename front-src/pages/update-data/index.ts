import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class UpdateData extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    const formEl = this.querySelector(".form");
    formEl?.addEventListener("submit", (event) => {
      event.preventDefault();
      let target = event.target as any; // cast target;
      console.log(typeof target.name.value, typeof target.city.value);
    });
  }

  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="login-container">
    <h1>Tus Datos Personales</h1>
    <form class="form">
    <label class="label">
    Nombre
    <input class="input" name="name" type="text" />
    </label>
    <label class="label">
    Localidad
    <input class="input" name="city" type="text" />
    </label>
    <button class="button">Guardar</button>
    </form>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("update-data-page", UpdateData);
