import { state } from "../../state.ts";
import { Router } from "@vaadin/router";

class Signup extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListeners() {
    const formEl = this.querySelector(".form");
    formEl?.addEventListener("submit", (event) => {
      event.preventDefault();
      let target = event.target as any;
      state.signUpUser(
        target.name.value,
        target.email.value,
        target.password.value,
        target.confirmation.value
      );
    });
  }
  render() {
    this.innerHTML = `
    <custom-header></custom-header>
    <div class="login-container">
    <h1>Registrate</h1>
    <p>Ingresa los siguientes datos para realizar el registro</p>
    <form class="form">
    <label class="label">
    Nombre
    <input class="input" name="name" type="text" />
    </label>
    <label class="label">
    Email
    <input class="input" name="email" type="email" />
    </label>
    <label class="label">
    Contraseña
    <input class="input" name="password" type="text" />
    </label>
    <label class="label">
    Confirmar contraseña
    <input class="input" name="confirmation" type="text" />
    </label>
    <button class="button">Registrarme</button>
    </form>
    <p>¿Ya tenes cuenta? <a href="./login">Inicia Sesion</a> </p>
    </div>
    `;
    this.addListeners();
  }
}
customElements.define("signup-page", Signup);
